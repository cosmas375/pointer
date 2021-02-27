import ShortcutsService from '../services/ShortcutsService';

export default class Pointer {
    constructor() {
        this.baseClassName = 'pointer';
        this.cancel = this.cancel.bind(this);
    }

    init() {
        throw new Error(`no 'create' method provided for ${this}!`);
    }

    remove() {
        throw new Error(`no 'remove' method provided for ${this.type}!`);
    }

    initCancellationShortcut() {
        this.shortutService = new ShortcutsService({ Escape: 'cancel' });
        this.shortutService.init(this.cancel);
    }
    removeCancellationShortcut() {
        this.shortutService.destroy();
    }


    preventDefault(e) {
        e.stopPropagation();
        e.preventDefault();
    }
}