import { app, session, Notification, dialog } from "electron";
import { autoUpdater } from "electron-updater";
const ProgressBar = require("electron-progressbar");

autoUpdater.autoDownload = false;

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
  if (process.env.NODE_ENV === "development") {
    const path = require("path");
    autoUpdater.updateConfigPath = path.join(__dirname, "dev-app-update.yml");
  }
  const progressBar = new ProgressBar({
    indeterminate: false,
    text: "Uppdateringen laddas...",
    detail: "Vänligen vänta..",
  });

  autoUpdater.checkForUpdates().then((update) => {});

  autoUpdater.on("update-not-available", () => {
    new Notification({
      title: "Finns inga uppdatering",
      body: "Finns inga uppdatering som är tillgängligt.",
    }).show();
  });

  autoUpdater.on("download-progress", (progress) => {
    progressBar.value = progress.percent;
    progressBar.detail = "%" + Math.round(progress.percent);
    progressBar.text = "Uppdateringen laddas...";
  });

  autoUpdater.on("update-downloaded", (progress) => {
    progressBar.close();
  });

  autoUpdater.on("update-available", () => {
    new Notification({
      title: "Uppdateringen laddas...",
      body: "Vänligen vänta..",
    }).show();

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

async function version() {
  dialog.showErrorBox("Version", app.getVersion());
}

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
      {
        label: "Version",
        click: async () => await version(),
      },
      {
        role: "toggleDevTools",
      },
      {
        role: "quit",
      },
    ],
  },
];
