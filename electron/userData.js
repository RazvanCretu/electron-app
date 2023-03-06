const electron = require("electron");
const path = require("path");
const fs = require("fs");

class UserData {
  constructor(opts) {
    // The path to the User's current AppData directory
    const userDataPath = electron.app.getPath("userData");

    // Append the custom name to it
    this.path = path.join(userDataPath, "config.json");
    this.data = parse(this.path, opts);
  }

  // GETTER
  get(key) {
    return this.data[key];
  }

  // SETTER
  set(key, val) {
    this.data[key] = val;
    // Wait, I thought using the node.js' synchronous APIs was bad form?
    // We're not writing a server so there's not nearly the same IO demand on the process
    // Also if we used an async API and our app was quit before the asynchronous write had a chance to complete,
    // we might lose that data. Note that in a real app, we would try/catch this.
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

function parse(filePath, opts) {
  // We'll try/catch it in case the file doesn't exist yet, which will be the case on the first application run.
  // `fs.readFileSync` will return a JSON string which we then parse into a Javascript object
  try {
    console.log("Local file parsed.");
    return JSON.parse(fs.readFileSync(filePath));
  } catch (error) {
    // if there was some kind of error, return the passed in defaults instead.
    return opts;
  }
}

// expose the class
module.exports = UserData;
