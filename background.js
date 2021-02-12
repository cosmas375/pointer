const contextMenus = [{
    id: 'root',
    title: 'Pointer',
    contexts: ['all'],
}, {
    id: 'pointer.arrow',
    title: 'Arrow ↗️',
    contexts: ['all'],
    parentId: 'root',
}, {
    id: 'pointer.html',
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
    const id = item.menuItemId;
    const message = { contextMenu: id };
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message);
    });
})


chrome.commands.onCommand.addListener(function (command) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { command });
    });
});