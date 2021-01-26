chrome.runtime.onMessage.addListener(function (message) {
    var pointerType = message.pointerType;
    if (!pointerType) {
        return;
    }
    onPointerTypeSelected(pointerType);
});