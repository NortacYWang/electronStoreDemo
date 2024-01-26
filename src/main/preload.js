const { contextBridge, ipcRenderer } = require("electron");
const { IpcEvents } = require("./db/constants.js");

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
};

contextBridge.exposeInMainWorld("electron", electronHandler);
