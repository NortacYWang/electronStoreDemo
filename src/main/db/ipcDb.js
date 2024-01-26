const { ipcMain } = require("electron");
const Store = require("./store");
const { IpcEvents } = require("./constants");

const getSuccessEvent = (event) => "sucess: " + event;
const getFailEvent = (event) => "fail: " + event;

ipcMain.handle(IpcEvents.loadStoreData, () => {
  try {
    const state = Store.getStore();
    return state;
  } catch (error) {
    return getFailEvent(IpcEvents.loadStoreData);
  }
});

ipcMain.handle(IpcEvents.setStoreValue, (key, value) => {
  try {
    Store.set(key, value);
    return { status: "success", result: { key, value } };
  } catch (error) {
    console.log(`Failed to set Store of key ${key}`, error);
    return getFailEvent(IpcEvents.setStoreValue);
  }
});
