import { CONTEXT_MENUS } from '../configs';


// context menu
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