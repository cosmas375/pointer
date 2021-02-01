class BasePointer {
    constructor() {
        this.baseClassName = 'pointer'; // sync w content.css
    }

    init() {
        throw new Error(`no 'init' method provided for ${this.type} pointer!`);
    }

    remove() {
        throw new Error(`no 'remove' method provided for ${this.type} pointer!`);
    }

    onCreated() { }
}