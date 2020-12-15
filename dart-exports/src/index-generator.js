const path = require("path");
const fs = require("fs");
//import { IndexExistsError } from "./errors/index-exists.error";

class IndexGenerator {
  constructor(showMsg) {
    this.showMsg = showMsg;
    this.dirPath;
    this.indexPath;
  }
  async execute(dirPath) {
    this.dirPath = dirPath;
    try {
      this.indexPath = path.join(this.dirPath, "index.dart");
      var fe = fs.existsSync(this.indexPath);
      if (fe) fs.writeFile(this.indexPath, "", this.callback);
      this.create();
      this.showMsg.info(
        `File: '${this.indexPath}' successfully ${fe ? "updated" : "created"}`
      );
    } catch (err) {
      this.showMsg.error(`Error: ${err.message}`);
      throw err;
    }
  }

  create() {
    try {
      this.writeToIndex();
      return;
    } catch (err) {
      console.log("Error", err.message);
      throw err;
    }
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

  toAbsPath(nameOrPath) {
    return path.resolve(this.workspaceRoot, nameOrPath);
  }

  dispose() {
    console.log("disposing");
  }

  callback(err) {
    if (err) throw err;
    console.log("File write successfull!");
  }
}

module.exports = IndexGenerator;
