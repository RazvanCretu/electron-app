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

module.exports = {
  handleWindowOpen,
};
