const path = require("path");
const url = require("url");

const { createURLRoute, createFileRoute } = require("electron-router-dom");
const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");

function createWindow(id, opts) {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      //   preload: join(__dirname, "../preload/index.js"),
    },
  });

  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "../build/index.html"),
      protocol: "file:",
      slashes: true,
    });

  //   and load the index.html of the app.
  //   win.loadFile("index.html");
  //   win.loadURL(
  //     isDev
  //       ? "http://localhost:3000"
  //       : `file://${join(__dirname, "../build/index.html")}`
  //   );

  // const devServerURL = createURLRoute("http://localhost:3000", id);

  // const fileRoute = createFileRoute(join(__dirname, "../build/index.html"), id);

  // isDev ? win.loadURL(devServerURL) : win.loadFile(...fileRoute);
  win.loadURL(startUrl);

  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow("");
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bars to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
