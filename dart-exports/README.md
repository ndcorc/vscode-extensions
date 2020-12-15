# Dart Exports

Working with Dart? Want to make your Dart imports cleaner? Use this utility to generate and maintain an `index.dart` file that exports all your '.dart' src files in a given directory.

## Features

To avoid the repetition and redundance of individual Dart package (file) imports, a common alternative is to organize
groups of packages into directories, each with a corresponding 'index.dart' file to export each package, thereby
allowing for single import statements of commonly used packages.

While this approach is helpful, creating + maintaining 'index.dart' files can become tedious as the # of package export
lines increases and package directories begin dynamically scaling.

This extension allows you to manually export your packages or automate this package export process with a listener. This listener will be configured to detect any `.dart` files
that are added to or removed from the specified directory.

In both the manual and automatic way, a `index.dart` file will be created with a reference to all the files in the current directory.

## Usage

To manually export all files in a directory:

- Right-click a folder in the Explorer window
- Select "Export All Packages"

![Export Packages](https://media.giphy.com/media/PiWeGu7KYJ9Mq3gHPn/giphy.gif)

To automate export with a listener:

- Right-click a folder in the Explorer window
- Select "Add Listener to Folder"

![Create Listener](https://media.giphy.com/media/Y0b87DOiKfa4b2UvEK/giphy.gif)

To stop listening to folder:

- Right-click a folder in the Explorer window
- Select "Remove Listener from Folder"

![Remove Listener](https://media.giphy.com/media/jt8ahTxS9VHXFTB6Pc/giphy.gif)

## Extension Settings

TO-DO:

- `dart-exports.enable`: enable/disable this extension

## Known Issues

Need to implement removal of listener and basic extension settings

## Release Notes

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

---

## Working with Markdown

**Note:** You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

- Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
- Toggle preview (`Shift+CMD+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
- Press `Ctrl+Space` (Windows, Linux) or `Cmd+Space` (macOS) to see a list of Markdown snippets

### For more information

- [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
- [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
