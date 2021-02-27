import ArrowPointer from './content/js/pointer/Arrow';
import HTMLPointer from './content/js/pointer/HTML';

export const POINTERS_MAP = {
    arrow: ArrowPointer,
    html: HTMLPointer,
};

export const CONTEXT_MENUS = [
    {
        id: 'root',
        title: 'Pointer',
        contexts: ['all'],
    }, {
        id: 'add.arrow',
        title: 'Arrow ↗️',
        contexts: ['all'],
        parentId: 'root',
    }, {
        id: 'add.html',
        title: 'HTML < />',
        contexts: ['all'],
        parentId: 'root',
    }, {
        id: 'separator',
        type: 'separator',
        title: 'separator',
        parentId: 'root',
        contexts: ['all'],
    }, {
        id: 'command.undo',
        title: 'Undo   x',
        contexts: ['all'],
        parentId: 'root',
    }, {
        id: 'command.redo',
        title: 'Redo   x',
        contexts: ['all'],
        parentId: 'root',
    }, {
        id: 'command.clear',
        title: 'Clear all   x',
        contexts: ['all'],
        parentId: 'root',
    }
];

export const SHORTCUTS_CONFIG = {
    KeyA: 'add.arrow',
    KeyH: 'add.html',
    KeyZ: 'command.undo',
    KeyC: 'command.clear',
    Escape: 'command.cancel',
};