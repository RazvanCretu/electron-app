const pjson = require("../package.json");
const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  versions: {
    app: pjson.version,
    electron: process.versions.electron,
    chrome: process.versions.chrome,
    node: process.versions.node,
  },
  handle: (channel, cb) => {
    ipcRenderer.on(channel, (event, ...args) => {
      ipcRenderer.removeAllListeners(channel);
      cb(...args);
    });
  },
  update: () => ipcRenderer.send("restart"),
  handleToken: (channel, cb) => {
    ipcRenderer.on("token", (event, ...args) => cb(...args));
  },
  openCsv: () => ipcRenderer.invoke("dialog:openCsv"),
  openFile: () => ipcRenderer.invoke("dialog:openFile"),
  close: () => ipcRenderer.send("window:close"),
  minimize: () => ipcRenderer.send("window:minimize"),
  maximize: () => ipcRenderer.send("window:maximize"),
});
