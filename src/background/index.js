// context menu
const CONTEXT_MENUS = [
    {
        id: 'root',
        title: 'Pointer',
        contexts: ['all'],
    }, {
        id: 'add.arrow',
        title: 'Arrow',
        contexts: ['all'],
        parentId: 'root',
    }, {
        id: 'add.html',
        title: 'HTML element',
        contexts: ['all'],
        parentId: 'root',
    }, {
        id: 'separator',
        type: 'separator',
        title: 'separator',
        parentId: 'root',
        contexts: ['all'],
    }, {
        id: 'save',
        title: 'Save to storage',
        contexts: ['all'],
        parentId: 'root',
    }, {
        id: 'restore',
        title: 'Restore from storage',
        contexts: ['all'],
        parentId: 'root',
    }, {
        id: 'undo',
        title: 'Undo',
        contexts: ['all'],
        parentId: 'root',
    }, {
        id: 'redo',
        title: 'Redo',
        contexts: ['all'],
        parentId: 'root',
    }, {
        id: 'clear',
        title: 'Clear',
        contexts: ['all'],
        parentId: 'root',
    }
];
CONTEXT_MENUS.forEach(item => {
    chrome.contextMenus.create(item);
});
chrome.contextMenus.onClicked.addListener(item => {
    const [command, params] = item.menuItemId.split('.');
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { trigger: 'context', data: { command, params } });
    });
});


// shortcut
chrome.commands.onCommand.addListener(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { trigger: 'shortcut' });
    });
});