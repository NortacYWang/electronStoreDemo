const { app, BrowserWindow } = require("electron");
const path = require("path");
const { dotConnection } = require("./dotConnection.js");
require("./src/main/db/ipcDb");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      sandbox: false,
    },
  });

  const startURL = "http://localhost:3000";

  mainWindow.loadURL(startURL);

  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    dotConnection.close();
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});


