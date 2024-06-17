const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vscode = require('vscode');
// const myExtension = require('../extension');

suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    test('Check .ollama folder existence', async () => {
        const homeDirectory = path.join(process.env.HOME || process.env.USERPROFILE, '.ollama');
        const exists = fs.existsSync(homeDirectory);
        assert.strictEqual(exists, true, 'The .ollama folder should exist in the HOME directory');
    });

    test('Sample test', () => {
        assert.strictEqual(-1, [1, 2, 3].indexOf(5));
        assert.strictEqual(-1, [1, 2, 3].indexOf(0));
    });
});
