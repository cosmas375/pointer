const container = document.querySelector('.container');

container.addEventListener('click', e => {
    const pointerType = e.target?.dataset?.pointerType;
    if (!pointerType) {
        return;
    }
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { pointerType });
    });
    window.close();
});