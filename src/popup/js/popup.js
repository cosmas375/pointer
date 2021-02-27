import localize from './localize';

localize();

const container = document.querySelector('.container');

container.addEventListener('click', e => {
    const data = e.target.dataset.action;
    if (!data) {
        return;
    }
    const [command, params] = data.split('.');
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { trigger: 'popup', data: { command, params } });
    });
    window.close();
});