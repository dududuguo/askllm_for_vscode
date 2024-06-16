// activate.js

const listOptionsCommand = require('./listOptions');
const vscode = require('vscode');
const { Ollama } = require('@langchain/community/llms/ollama');

let documentUri = null;
let conversationHistory = [];
let lastModel = null;

async function onDidOpenTextDocument() {
    try {
        const optionsList = await listOptionsCommand.listOptions();
        console.log('Options List:', optionsList);
        if (optionsList.length === 0) {
            vscode.window.showErrorMessage('No options found');
            return;
        }

        // Show a quick pick list of options
        const userInput = await vscode.window.showQuickPick(optionsList, {
            placeHolder: 'Select a model to chat with:',
        });

        if (userInput) {
            const model = userInput.label;
            createPrompts(model);
        }
    } catch (error) {
        console.error(error);
    }
}

async function callModel(model, prompts) {
    if (lastModel !== model) {
        conversationHistory = [];
        lastModel = model; // updaet the last model
    }
    try {
        let doc = await vscode.workspace.openTextDocument(documentUri);
        let editor = await vscode.window.showTextDocument(doc, { preview: false });
        let chatTime = new Date().toLocaleString();
        if (conversationHistory.length === 0) {
            editor.edit(editBuilder => {
                const newChat = '\n## MODEL-- ' + model + '\n';
                editBuilder.insert(new vscode.Position(editor.document.lineCount, 0), newChat);
            });
        }
        conversationHistory.push('User: ' + prompts);
        const ollama = new Ollama({
            baseUrl: "http://localhost:11434",
            model: model,
        });

        // before calling the model, we need to join all the conversation history
        const fullPrompt = conversationHistory.join('\n');
        const answer_md = await ollama.invoke(fullPrompt);
        const responseTime = new Date().toLocaleString();

        // add the response to the conversation history
        conversationHistory.push('Assistant: ' + answer_md);

        const currentChat = "- "+chatTime +' __User__: ' + prompts + '\n' + responseTime + ' __Assistant__: ' + answer_md + '\n';
        console.log('message: ', { command: 'update', content: answer_md });

        editor.edit(editBuilder => {
            editBuilder.insert(new vscode.Position(editor.document.lineCount, 0), currentChat);
        });
    } catch (error) {
        console.error('Error calling the API:', error);
        vscode.window.showErrorMessage(`Failed to call the API. Error: ${error.message}`);
    }
}

// Create prompts and allow user selection some code as prompts
async function createPrompts(model) {
    const editor = vscode.window.activeTextEditor;
    let promptsMessage = '';

    if (editor) {
        const document = editor.document;
        const selection = editor.selection;
        promptsMessage = document.getText(selection);
    }
    const promptUser = await vscode.window.showInputBox({
        prompt: 'Enter your message to the model:',
        placeHolder: 'prompt message'
    });

    if (!promptUser) return;
    const prompts = `${promptUser} ${promptsMessage}`;
    documentUri = vscode.Uri.parse('untitled:assistant.md')
    callModel(model, prompts);
    lastModel = model;
}

module.exports = {
    onDidOpenTextDocument
};