const ElectronStore = require('electron-store');

module.exports = class Store {
  static instance = new ElectronStore();

  static clear() {
    Store.instance.clear();
  }

  static get(key) {
    return Store.instance.get(key);
  }

  static getStore() {
    return Store.instance.store;
  }

  static set(key, value) {
    Store.instance.set(key, value);
  }

  static setStore() {
    Store.instance.set(state);
  }
}
