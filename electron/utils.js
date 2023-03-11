const { shell, dialog } = require("electron");

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

const transformCsvData = (data) => {
  const [columns, ...rows] = data;
  return rows.map((item) => {
    let itemData = {};
    item.forEach((val, i, arr) => {
      itemData[columns[i]] = val;
    });
    return itemData;
  });
};

module.exports = {
  handleWindowOpen,
  transformCsvData,
};
