import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "getter-setter" is now active!');

  let disposable = vscode.commands.registerCommand(
    "extension.generateDartGetSet",
    () => {
      var editor = vscode.window.activeTextEditor;
      if (!editor) return; // No open text editor
      const selection = editor.selection;
      var text = editor.document.getText(selection);
      if (text.length < 1) {
        vscode.window.showErrorMessage("No selected properties.");
        return;
      }

      let properties = text
        .split(/(\r?\n)/)
        .filter((x) => x.length >= 2)
        .map((x) => x.replace(";", ""));

      let generatedMethods = [];
      for (let p of properties) {
        generatedMethods = generateGetterAndSetter(p);
      }

      editor.edit((edit) =>
        editor.selections.forEach((selection) => {
          edit.insert(selection.end, generatedMethods.join("\n"));
          arr = [];
        })
      );
    }
  );

  let s;
  let setter;
  let arr = [];
  function generateGetterAndSetter(prop) {
    let vars = prop.split(" ");
    let varName, final, type;
    if (vars.length == 3) {
      [final, type, varName] = vars;
    } else if (vars.length == 2) {
      if (vars.includes("final")) {
        varName = vars[1];
        type = "dynamic";
      } else {
        [type, varName] = vars;
      }
    }

    let varUpprName =
      varName.toString().charAt(0).toUpperCase() + varName.toString().slice(1);
    if (prop.includes("_")) {
      let varLowerName =
        varName.toString().charAt(0).toLowerCase() +
        varName.toString().slice(1);
      s = `\n ${type} get ${varLowerName.replace("_", "")} => ${varName};`;
      setter = `\n set ${varLowerName.replace(
        "_",
        ""
      )}(${type} value) => ${varName} = value;`;
    } else {
      s = `\n ${type} get get${varUpprName} => ${varName};`;
      setter = `\n set set${varUpprName}(${type} ${varName}) => this.${varName} = ${varName};`;
    }
    let uri = vscode.window.activeTextEditor.document.getText();
    if (uri.includes(`get${varUpprName}`)) {
      vscode.window.showErrorMessage("Setter and Getter already created.");
      return;
    }
    arr.push(s, setter);
    let sets = new Set(arr);
    let it = sets.values();
    arr = Array.from(it);
    return arr;
  }
  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
