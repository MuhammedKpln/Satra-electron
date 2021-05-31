console.log("qwe");

import { ipcRenderer, contextBridge } from "electron";
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  send: (channel: string, data: any) => {
    ipcRenderer.send(channel, data);
  },
  receive: (channel: string, func: (...T: any) => void) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
});
