// The module 'vscode' contains the VS Code extensibility API
const activateModel = require('./src/activate');


// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

function getOperatingSystem() {
	const platform = process.platform;

	if (platform === 'darwin') {
		return true;
	} else if (platform === 'linux') {
		return true;
	} else if (platform === 'freebsd') {
		return false;
	} else if (platform === 'win32') {
		return true;
	} else {
		return false;
	}
}

console.log('Operating System:', getOperatingSystem());

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	const disposable = vscode.commands.registerCommand('llmcaller', async function () {
		vscode.window.showInformationMessage('Hello! Input \'\>ask llm\' to start the conversation.');
		// check if the operating system is Mac OS
		if (getOperatingSystem()) {
			if (!vscode.workspace.workspaceFolders) {
				vscode.window.showErrorMessage("Please open a workspace to keep the chat history.");
				return; 
			}
			activateModel.onDidOpenTextDocument();
		} else {
			vscode.window.showErrorMessage("This extension is only supported on Mac OS NOW.");
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
