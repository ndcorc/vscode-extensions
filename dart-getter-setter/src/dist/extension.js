"use strict";
exports.__esModule = true;
exports.deactivate = exports.activate = void 0;
var vscode = require("vscode");
function activate(context) {
    console.log('Congratulations, your extension "getter-setter" is now active!');
    var disposable = vscode.commands.registerCommand("extension.generateDartGetSet", function () {
        var editor = vscode.window.activeTextEditor;
        if (!editor)
            return; // No open text editor
        var selection = editor.selection;
        var text = editor.document.getText(selection);
        if (text.length < 1) {
            vscode.window.showErrorMessage("No selected properties.");
            return;
        }
        var properties = text
            .split(/(\r?\n)/)
            .filter(function (x) { return x.length >= 2; })
            .map(function (x) { return x.replace(";", ""); });
        var generatedMethods = [];
        for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
            var p = properties_1[_i];
            generatedMethods = generateGetterAndSetter(p);
        }
        editor.edit(function (edit) {
            return editor.selections.forEach(function (selection) {
                edit.insert(selection.end, generatedMethods.join("\n"));
                arr = [];
            });
        });
    });
    var s;
    var setter;
    var arr = [];
    function generateGetterAndSetter(prop) {
        var vars = prop.split(" ");
        var varName, final, type;
        if (vars.length == 3) {
            final = vars[0], type = vars[1], varName = vars[2];
        }
        else if (vars.length == 2) {
            if (vars.includes("final")) {
                varName = vars[1];
                type = "dynamic";
            }
            else {
                type = vars[0], varName = vars[1];
            }
        }
        var varUpprName = varName.toString().charAt(0).toUpperCase() + varName.toString().slice(1);
        if (prop.includes("_")) {
            var varLowerName = varName.toString().charAt(0).toLowerCase() +
                varName.toString().slice(1);
            s = "\n " + type + " get " + varLowerName.replace("_", "") + " => " + varName + ";";
            setter = "\n set " + varLowerName.replace("_", "") + "(" + type + " value) => " + varName + " = value;";
        }
        else {
            s = "\n " + type + " get get" + varUpprName + " => " + varName + ";";
            setter = "\n set set" + varUpprName + "(" + type + " " + varName + ") => this." + varName + " = " + varName + ";";
        }
        var uri = vscode.window.activeTextEditor.document.getText();
        if (uri.includes("get" + varUpprName)) {
            vscode.window.showErrorMessage("Setter and Getter already created.");
            return;
        }
        arr.push(s, setter);
        var sets = new Set(arr);
        var it = sets.values();
        arr = Array.from(it);
        return arr;
    }
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
