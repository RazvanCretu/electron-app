const { remote, ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  ipc: ipcRenderer,
  handleToken: (channel, func) => {
    ipcRenderer.on("token", (event, ...args) => func(...args));
  },
  openFile: () => ipcRenderer.invoke("dialog:openFile"),
  close: () => ipcRenderer.send("window:close"),
  minimize: () => ipcRenderer.send("window:minimize"),
  maximize: () => ipcRenderer.send("window:maximize"),
});
