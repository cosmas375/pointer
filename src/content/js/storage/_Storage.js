export default class Storage {
    constructor() {

    }

    saveData() {
        throw new Error(`No 'saveData' method provided for ${this}!`);
    }

    getData() {
        throw new Error(`No 'getData' method provided for ${this}!`);
    }
}