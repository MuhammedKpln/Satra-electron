import { app, BrowserWindow, screen, Menu, ipcMain } from "electron";
import { menuTemplate } from "./menu";
try {
  require("electron-reloader")(module);
} catch (_) {}
function createWindow() {
  // Create the browser window.
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const mainWindow = new BrowserWindow({
    width,
    height,
    show: false, // don't show the main window
    autoHideMenuBar: true,
    webPreferences: {
      webviewTag: true,
      preload: __dirname + "/preload.js",
    },
    titleBarStyle: "hidden",
  });

  const splash = new BrowserWindow({
    width: 810,
    height: 610,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
  });

  splash.loadURL(`file://${__dirname}/src/loading.html`);
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);

  mainWindow.once("ready-to-show", () => {
    mainWindow.webContents.executeJavaScript(`window.localStorage.clear()`);

    setTimeout(() => {
      splash.destroy();
      mainWindow.show();
    }, 2000);
  });
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  //@ts-ignore
  const m = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(m);

  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
