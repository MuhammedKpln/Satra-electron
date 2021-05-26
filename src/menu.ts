import { app, session, dialog } from "electron";
import { autoUpdater } from "electron-updater";

const hardRestart = async () => {
  await session.defaultSession.clearAuthCache();
  await session.defaultSession.clearStorageData();
  await session.defaultSession.clearHostResolverCache();
  await session.defaultSession.clearCache();
  app.relaunch();
  app.exit(0);
  app.quit();
  console.log("Hard restarted");
};

const update = async () => {
  const update = await autoUpdater.checkForUpdatesAndNotify({
    title: "Uppdatering tillgänglig!",
    body: "Uppdatering tillgänglig för Sätra Trafikskola.",
  });

  if (!update) {
    dialog.showErrorBox("Finns inga uppdatering", "");
  }
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
        click: async () => await update(),
      },
    ],
  },
];
