import ArrowPointer from './pointer/Arrow';
import HTMLPointer from './pointer/HTML';
import RectanglePointer from './pointer/Rectangle';

export const POINTERS_MAP = [
    ArrowPointer,
    HTMLPointer,
    RectanglePointer,
].reduce((accum, pointer) => {
    accum[pointer.type] = pointer;
    return accum;
}, {});

export const SHORTCUTS_CONFIG = {
    KeyA: 'add.arrow',
    KeyH: 'add.html',
    KeyR: 'add.rectangle',
    KeyZ: 'undo',
    KeyC: 'clear',
    KeyS: 'save',
    KeyV: 'restore',
    Escape: 'cancel',
};

export const LOCAL_STORAGE_KEY = 'pointer_data';