import Storage from './_Storage';

export default class LocalStorage extends Storage {
    constructor({ key }) {
        super();
        this.key = key;
    }

    saveData(data, callback) {
        chrome.storage.local.set({ [this.key]: data }, callback);
    }

    getData(callback) {
        chrome.storage.local.get(this.key, data => {
            callback(data[this.key]);
        });
    }
}