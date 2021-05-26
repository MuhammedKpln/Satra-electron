import { app, session, dialog } from "electron";
import { autoUpdater } from "electron-updater";

const hardRestart = async () => {
  await session.defaultSession.clearAuthCache();
  await session.defaultSession.clearStorageData();
  await session.defaultSession.clearHostResolverCache();
  await session.defaultSession.clearCache();
  app.relaunch();
  console.log("Hard restarted");
};

const update = async () => {
  dialog.showErrorBox("selam", "as");
};

export const menuTemplate = [
  {
    label: "Inställningar",
    submenu: [
      {
        label: "AirRestart",
        click: () => hardRestart(),
      },
      {
        label: "Uppdatera",
        click: () => autoUpdater.checkForUpdatesAndNotify(),
      },
      {
        label: "HelloWorld",
        click: () => update(),
      },
    ],
  },
];
