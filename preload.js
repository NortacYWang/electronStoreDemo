const { contextBridge, ipcRenderer } = require("electron");
const { IpcEvents } = require("./src/main/db/constants.js");

const electronHandler = {
  ipcRenderer: {
    setStoreValue: async (key, value) => {
      const result = await ipcRenderer.invoke(
        IpcEvents.setStoreValue,
        key,
        value
      );
      return result;
    },

    loadStoreData: async () => {
      const storeData = await ipcRenderer.invoke(IpcEvents.loadStoreData);
      return storeData;
    },

    unzipHex: async (toUnzip) => {
      const storeData = await ipcRenderer.invoke(IpcEvents.unZip, toUnzip);
      return storeData;
    },
  },
};

contextBridge.exposeInMainWorld("electron", electronHandler);
