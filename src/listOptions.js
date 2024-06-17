// listOptions.js

const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

// List the contents of a directory
async function listDirectoryContents(directoryPath) {
    let results = [];

    async function recursiveRead(dir) {
        const entries = await fs.promises.readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                await recursiveRead(fullPath);
            } else {
                results.push(`${path.basename(dir)}:${entry.name}`);
            }
        }
    }

    try {
        await recursiveRead(directoryPath);
        return results;
    } catch (error) {
        console.error('Error reading directory:', error);
        return [];
    }
}

// list models
async function listOptions() {
    try {
        // only support official models in library, using official registry
        const directoryPath = path.join(process.env.HOME, '.ollama/models/manifests/registry.ollama.ai/library');
        const output = await listDirectoryContents(directoryPath);  
        if (output.length === 0) { 
            vscode.window.showErrorMessage('No options found');
            return []; 
        }
        return output;
    } catch (error) {
        console.error('Failed to list options:', error);
        vscode.window.showErrorMessage("Failed to list options: " + error.message);
        return []; 
    }
}

module.exports = { listOptions };