const { shell, dialog } = require("electron");
const fs = require("fs");
const { parse } = require("csv");

const handleWindowOpen = ({ url }) => {
  if (url.startsWith("https://")) {
    shell.openExternal(url);
  } else {
    dialog.showErrorBox(
      "Window Open Handler",
      "Trying to open an unsecure url."
    );
  }
  return { action: "deny" };
};

const readCsvData = (path) => {
  let _ = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(path)
      .on("error", (err) => reject(err))
      .pipe(parse({ delimiter: ",", columns: true }))
      .on("data", function (row) {
        _.push(row);
      })
      .on("end", () => {
        resolve(_);
      });
  });
  // fs.readFileSync(path,"utf-8");
};

module.exports = {
  handleWindowOpen,
  readCsvData,
};
