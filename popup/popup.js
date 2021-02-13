var container = document.querySelector('.container');

container.addEventListener('click', e => {
    var command = e.target.dataset.command;
    if (!command) {
        return;
    }
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { trigger: 'popup', command });
    });
    window.close();
});