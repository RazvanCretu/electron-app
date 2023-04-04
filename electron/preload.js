const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  versions: {
    // app: app.getVersion(),
    electron: process.versions.electron,
    chrome: process.versions.chrome,
    node: process.versions.node,
  },
  handleToken: (channel, cb) => {
    ipcRenderer.on("token", (event, ...args) => cb(...args));
  },
  openCsv: () => ipcRenderer.invoke("dialog:openCsv"),
  openFile: () => ipcRenderer.invoke("dialog:openFile"),
  close: () => ipcRenderer.send("window:close"),
  minimize: () => ipcRenderer.send("window:minimize"),
  maximize: () => ipcRenderer.send("window:maximize"),
});
