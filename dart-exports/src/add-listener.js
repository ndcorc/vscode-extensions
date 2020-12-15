const path = require("path");
const fs = require("fs");
/* import {
  IndexExistsError,
  IndexDoesNotExistError,
} from "./errors/index-exists.error"; */

class AddListener {
  constructor(showMsg, createWatcher) {
    this.showMsg = showMsg;
    this.createWatcher = createWatcher;
    this.watcher;
    this.dirPath;
    this.indexPath;
  }
  async execute(dirPath) {
    this.dirPath = dirPath;
    this.watcher = this.createWatcher.create(this.dirPath);
    try {
      this.indexPath = path.join(this.dirPath, "index.dart");
      if (!fs.existsSync(this.indexPath)) this.create();
      this.startListening(dirPath);
      this.showMsg.info(`Now listening to '${this.dirPath}'`);
    } catch (err) {
      this.showMsg.error(`Error: ${err.message}`);
      throw err;
    }
  }

  startListening() {
    this.watcher.onDidCreate((uri) => {
      console.log(`created ${uri}`);
      this.resetIndex();
      this.create();
    });
    this.watcher.onDidDelete((uri) => {
      console.log(`deleted ${uri}`);
      this.resetIndex();
      this.create();
    });
  }

  stopListening() {
    this.watcher.dispose();
  }

  create() {
    console.log("generating index file");
    try {
      this.writeToIndex();
    } catch (err) {
      console.log("Error", err.message);
      throw err;
    }
  }

  resetIndex() {
    fs.writeFile(this.indexPath, "", this.callback); // first clear contents of index.dart
  }

  writeToIndex() {
    let fileStr = "";
    fs.readdirSync(this.dirPath).forEach((file) => {
      const fname = path.basename(file);
      const fname2 = `${file}.dart`;
      console.log(`fname = ${fname}, fname2 = ${fname2}`);
      if (fname != "index.dart") fileStr += `export '${fname}';\n`;
    });
    fs.appendFile(this.indexPath, fileStr, this.callback);
  }

  dispose() {
    console.log("disposing");
  }

  callback(err) {
    if (err) throw err;
    console.log("File write successfull!");
  }
}

module.exports = AddListener;
