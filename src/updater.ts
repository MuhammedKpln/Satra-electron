/**
 * updater.js
 *
 * Please use manual update only when it is really required, otherwise please use recommended non-intrusive auto update.
 *
 * Import steps:
 * 1. create `updater.js` for the code snippet
 * 2. require `updater.js` for menu implementation, and set `checkForUpdates` callback from `updater` for the click property of `Check Updates...` MenuItem.
 */
import { AutoUpdater, dialog } from "electron";
import { autoUpdater } from "electron-updater";

let updater: AutoUpdater;
autoUpdater.autoDownload = false;

autoUpdater.on("error", (error) => {
  dialog.showErrorBox(
    "Error: ",
    error == null ? "unknown" : (error.stack || error).toString(),
  );
});

autoUpdater.on("update-available", () => {
  dialog.showMessageBox(
    {
      type: "info",
      title: "Found Updates",
      message: "Found updates, do you want update now?",
      buttons: ["Sure", "No"],
    },
    (buttonIndex: number) => {
      if (buttonIndex === 0) {
        autoUpdater.downloadUpdate();
      } else {
        updater = null;
      }
    },
  );
});

autoUpdater.on("update-not-available", () => {
  dialog.showMessageBox({
    title: "No Updates",
    message: "Current version is up-to-date.",
  });
  updater = null;
});

autoUpdater.on("update-downloaded", () => {
  dialog.showMessageBox(
    {
      title: "Install Updates",
      message: "Updates downloaded, application will be quit for update...",
    },
    () => {
      setImmediate(() => autoUpdater.quitAndInstall());
    },
  );
});

// export this to MenuItem click callback
export function checkForUpdates(menuItem, focusedWindow, event) {
  updater = menuItem;
  autoUpdater.checkForUpdates();
}
