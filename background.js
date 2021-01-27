chrome.commands.onCommand.addListener(function (command) {
    console.log('Command:', command);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { command });
    });
});
