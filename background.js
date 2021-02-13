const contextMenus = [{
    id: 'root',
    title: 'Pointer',
    contexts: ['all'],
}, {
    id: 'initPointer.arrow',
    title: 'Arrow ↗️',
    contexts: ['all'],
    parentId: 'root',
}, {
    id: 'initPointer.html',
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
    id: 'command.clear',
    title: 'Clear all   x',
    contexts: ['all'],
    parentId: 'root',
}];
contextMenus.forEach(item => {
    chrome.contextMenus.create(item);
});
chrome.contextMenus.onClicked.addListener(item => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { trigger: 'context', command: item.menuItemId });
    });
})


chrome.commands.onCommand.addListener(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { trigger: 'shortcut' });
    });
});