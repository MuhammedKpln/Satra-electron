"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuTemplate = void 0;
var electron_1 = require("electron");
var electron_updater_1 = require("electron-updater");
var ProgressBar = require("electron-progressbar");
electron_updater_1.autoUpdater.autoDownload = false;
var hardRestart = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, electron_1.session.defaultSession.clearAuthCache()];
            case 1:
                _a.sent();
                return [4 /*yield*/, electron_1.session.defaultSession.clearStorageData()];
            case 2:
                _a.sent();
                return [4 /*yield*/, electron_1.session.defaultSession.clearHostResolverCache()];
            case 3:
                _a.sent();
                return [4 /*yield*/, electron_1.session.defaultSession.clearCache()];
            case 4:
                _a.sent();
                electron_1.app.relaunch();
                electron_1.app.exit(0);
                electron_1.app.quit();
                console.log("Hard restarted");
                return [2 /*return*/];
        }
    });
}); };
var update = function () { return __awaiter(void 0, void 0, void 0, function () {
    var path, progressBar;
    return __generator(this, function (_a) {
        if (process.env.NODE_ENV === "development") {
            path = require("path");
            electron_updater_1.autoUpdater.updateConfigPath = path.join(__dirname, "dev-app-update.yml");
        }
        progressBar = new ProgressBar({
            indeterminate: false,
            text: "Uppdateringen laddas...",
            detail: "Vänligen vänta..",
        });
        electron_updater_1.autoUpdater.checkForUpdates().then(function (update) { });
        electron_updater_1.autoUpdater.on("update-not-available", function () {
            new electron_1.Notification({
                title: "Finns inga uppdatering",
                body: "Finns inga uppdatering som är tillgängligt.",
            }).show();
        });
        electron_updater_1.autoUpdater.on("download-progress", function (progress) {
            progressBar.value = progress.percent;
            progressBar.detail = "%" + Math.round(progress.percent);
            progressBar.text = "Uppdateringen laddas...";
        });
        electron_updater_1.autoUpdater.on("update-downloaded", function (progress) {
            progressBar.close();
        });
        electron_updater_1.autoUpdater.on("update-available", function () {
            new electron_1.Notification({
                title: "Uppdateringen laddas...",
                body: "Vänligen vänta..",
            }).show();
            electron_updater_1.autoUpdater
                .downloadUpdate()
                .then(function () {
                new electron_1.Notification({
                    title: "Uppdateringen laddats, installeras..",
                    body: "Uppdateringen laddats, installeras..",
                }).show();
                setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, electron_updater_1.autoUpdater.quitAndInstall(false, true)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }, 3000);
            })
                .catch(function (err) {
                new electron_1.Notification({
                    title: "Uppdateringen laddats, installeras..",
                    body: err.toString(),
                }).show();
            });
        });
        return [2 /*return*/];
    });
}); };
function version() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            electron_1.dialog.showErrorBox("Version", electron_1.app.getVersion());
            return [2 /*return*/];
        });
    });
}
exports.menuTemplate = [
    {
        label: "Inställningar",
        submenu: [
            {
                label: "AirRestart",
                click: function () { return hardRestart(); },
            },
            {
                label: "Uppdatera",
                click: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, update()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                }); }); },
            },
            {
                label: "Version",
                click: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, version()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                }); }); },
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
