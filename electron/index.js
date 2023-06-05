const {
  app,
  shell,
  Menu,
  BrowserWindow,
  ipcMain,
  dialog,
} = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("path");
const url = require("url");
const { handleWindowOpen, readCsvData } = require("./utils");
const UserData = require("./userData");
const isDev = require("electron-is-dev");

let win;
Menu.setApplicationMenu(null);

const localData = new UserData({ width: 1200, height: 800 });

console.log(localData.get("width"));

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient("app", process.execPath, [
      path.resolve(process.argv[1]),
    ]);
  }
} else {
  app.setAsDefaultProtocolClient("app");
}

const handleWindowClose = () => {
  win.close();
};

const handleFileOpen = async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog(win);
  if (canceled) {
    return;
  } else {
    shell.openPath(filePaths[0]);
    return filePaths[0];
  }
};

const handleCsvOpen = async () => {
  const filePaths = dialog.showOpenDialogSync(win, {
    title: "Choose a .csv file to open",
    filters: [{ name: "Csv", extensions: ["csv"] }],
    properties: ["openFile"],
  });

  try {
    const data = await readCsvData(filePaths[0]);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const createWindow = () => {
  // Creates the browser window.
  win = new BrowserWindow({
    minHeight: 800,
    minWidth: 1200,
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "./preload.js"),
    },
  });

  // Create the URL needed to load the window.
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(app.getAppPath(), "./build/index.html"),
      protocol: "file:",
      slashes: true,
    });

  // Load HTML of the app.
  win.loadURL(startUrl);
  win.webContents.setWindowOpenHandler(handleWindowOpen);

  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }

  win.once("ready-to-show", () => {
    win.setBackgroundColor("#282e3a");
    win.show();
    win.focus();

    autoUpdater.checkForUpdatesAndNotify();
  });

  // Emitted when the window is closed.
  win.on("closed", function () {
    win = null; // delete corresponding element
  });
};

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (win) {
      const deepLink = commandLine.find((arg) => arg.startsWith("app://"));
      const token = deepLink.substring(6).slice(0);

      if (win.isMinimized()) win.restore();
      win.focus();

      win.webContents.send("token", token);
    }
  });

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app
    .whenReady()
    .then(() => {
      createWindow();

      app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createWindow();
        }
      });
    })
    .then(() => {
      ipcMain.handle("dialog:openCsv", handleCsvOpen);
      ipcMain.handle("dialog:openFile", handleFileOpen);
      ipcMain.on("window:close", handleWindowClose);
      ipcMain.on("window:minimize", () => win?.minimize());
      ipcMain.on("window:maximize", () => {
        if (win?.isMaximized()) {
          win.unmaximize();
        } else {
          win.maximize();
        }
      });
    });
}

// AUTOUPDATER
autoUpdater.on("update-downloaded", () => {
  win.webContents.send("update_downloaded");
});

ipcMain.on("restart", () => {
  autoUpdater.quitAndInstall();
});

// ########## MAC OS ##########
app.on("open-url", (event, url) => {
  dialog.showErrorBox("Welcome Back", `You arrived from: ${url}`);
});

// Quit when all windows are closed, except on MAC OS. It's common
// for applications and their menu bars to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
