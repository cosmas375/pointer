const SHORTCUTS_MAP = {
    KeyA: 'initPointer.arrow',
    KeyH: 'initPointer.html',
    KeyC: 'command.clear',
    Escape: 'command.cancel',
};
const POINTERS_MAP = {
    arrow: ArrowPointer,
    html: HTMLPointer,
};


// main starts here
const pointersContainer = new PointersContainer();
const shortcutsService = new ShortcutsService(SHORTCUTS_MAP);

chrome.runtime.onMessage.addListener(function (message) {
    if (message.trigger === 'shortcut') {
        addInfoOverlay();
        shortcutsService.init(command => {
            hideInfoOverlay();
            onMessageReceived({ command });
        });
    } else {
        onMessageReceived(message);
    }
});



function onMessageReceived({ command }) {
    const [action, type] = command.split('.');
    switch (action) {
        case 'initPointer':
            const PointerClass = POINTERS_MAP[type];
            if (!PointerClass) {
                return;
            }
            const pointer = new PointerClass(ShortcutsService);
            pointersContainer.initPointer(pointer);
            break;
        case 'command':
            if (type === 'clear') {
                pointersContainer.removeAllCreatedPointers();
            }
            break;
    }
}