const { contextBridge, ipcRenderer } = require("electron");
const { IpcEvents } = require("./src/main/db/constants.js");
const { dotConnection } = require("./dotConnection.js");

const electronHandler = {
  ipcRenderer: {
    setStoreValue: async (key, value) => {
      const result = ipcRenderer.invoke(IpcEvents.setStoreValue, key, value);
      return result;
    },

    loadStoreData: async () => {
      const storeData = await ipcRenderer.invoke(IpcEvents.loadStoreData);
      return storeData;
    },
  },
  dotConnection: async (method, hex) => {
    try {
      const result = await dotConnection.send(method, hex);
    
      return result;
    } catch (err) {
      console.log("err", err);
      return err;
    }
  },
};

contextBridge.exposeInMainWorld("electron", electronHandler);
