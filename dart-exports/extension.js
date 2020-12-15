// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
//import vscode from "vscode";
const { IndexGenerator, AddListener } = require("./src/index");
const vscode = require("vscode");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
const showMsg = {
  info: vscode.window.showInformationMessage,
  error: vscode.window.showErrorMessage,
};

/**
 * @param {ExtensionContext} context
 */
function activate(context) {
  console.log('Congratulations, your extension "dart-exports" is now active!');
  let createWatcher = {
    create: (dirPath) =>
      vscode.workspace.createFileSystemWatcher(
        vscode.RelativePattern(dirPath, "*.dart")
      ),
  };
  let indexGenerator = new IndexGenerator(showMsg);
  let indexListener = new AddListener(showMsg, createWatcher);

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let exportPackages, addListener, removeListener;

  exportPackages = vscode.commands.registerCommand(
    "dart-exports.exportAllPackages",
    (ctx) => indexGenerator.execute(ctx.fsPath)
  );
  context.subscriptions.push(exportPackages);
  context.subscriptions.push(indexGenerator);

  addListener = vscode.commands.registerCommand(
    "dart-exports.addExportListener",
    (ctx) => indexListener.execute(ctx.fsPath)
  );
  context.subscriptions.push(addListener);
  removeListener = vscode.commands.registerCommand(
    "dart-exports.removeExportListener",
    (ctx) => indexListener.stopListening()
  );
  context.subscriptions.push(removeListener);
  context.subscriptions.push(indexListener);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
