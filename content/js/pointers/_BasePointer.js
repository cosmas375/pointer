class BasePointer {
    constructor() {
        this.baseClassName = 'pointer'; // sync w content.css
        this.shortcuts = new ShortcutsService({ Escape: 'cancel' });
    }

    init() {
        throw new Error(`no 'init' method provided for ${this.type} pointer!`);
    }

    remove() {
        throw new Error(`no 'remove' method provided for ${this.type} pointer!`);
    }

    cancel() {
        throw new Error(`no 'cancel' method provided for ${this.type} pointer!`);
    }

    onCreated() { }

    initShortcuts() {
        this.shortcuts.init(() => this.cancel());
    }
    removeShortcuts() {
        this.shortcuts.destroy();
    }
}