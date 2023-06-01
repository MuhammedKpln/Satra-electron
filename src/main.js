"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var menu_1 = require("./menu");
if (process.env.NODE_ENV === "development") {
    try {
        require("electron-reloader")(module);
    }
    catch (_) {
        console.error(_);
    }
}
function createWindow() {
    // Create the browser window.
    var _a = electron_1.screen.getPrimaryDisplay().workAreaSize, width = _a.width, height = _a.height;
    var mainWindow = new electron_1.BrowserWindow({
        width: width,
        height: height,
        show: false,
        autoHideMenuBar: true,
        webPreferences: {
            webviewTag: true,
            preload: __dirname + "/preload.js",
        },
        titleBarStyle: "hidden",
    });
    var splash = new electron_1.BrowserWindow({
        width: 810,
        height: 610,
        transparent: true,
        frame: false,
        alwaysOnTop: true,
    });
    splash.loadURL("file://".concat(__dirname, "/src/loading.html"));
    mainWindow.loadURL("file://".concat(__dirname, "/src/index.html"));
    mainWindow.once("ready-to-show", function () {
        mainWindow.webContents.executeJavaScript("window.localStorage.clear()");
        setTimeout(function () {
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
electron_1.app.on("ready", function () {
    //@ts-ignore
    var m = electron_1.Menu.buildFromTemplate(menu_1.menuTemplate);
    electron_1.Menu.setApplicationMenu(m);
    createWindow();
    var urls = ["http://64.226.101.127/*"];
    if (process.env.DEVELOPMENT) {
        urls.push("http://localhost:3000/*");
    }
    var filter = {
        urls: urls,
    };
    electron_1.session.defaultSession.webRequest.onBeforeSendHeaders(filter, function (details, callback) {
        details.requestHeaders["satra-client"] = "14oqwkelo53";
        callback({ cancel: false, requestHeaders: details.requestHeaders });
    });
    electron_1.app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on("window-all-closed", function () {
    electron_1.app.quit();
});
// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
