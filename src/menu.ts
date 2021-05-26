import { app, session, Notification } from "electron";
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
    new Notification({
      title: "Finns inga uppdatering",
      body: "Finns inga uppdatering som är tillgängligt.",
    }).show();

    return false;
  }

  new Notification({
    title: "Laddar ner uppdateringen..",
    body: "Vänligen vänta till uppdateringen laddas ner..",
  }).show();

  autoUpdater.checkForUpdates().then(() => {
    autoUpdater
      .downloadUpdate()
      .then(() => {
        new Notification({
          title: "Uppdateringen laddats, installeras..",
          body: "Uppdateringen laddats, installeras..",
        }).show();

        setTimeout(async () => {
          await autoUpdater.quitAndInstall(false, true);
        }, 3000);
      })
      .catch((err) => {
        new Notification({
          title: "Uppdateringen laddats, installeras..",
          body: err.toString(),
        }).show();
      });
  });
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
