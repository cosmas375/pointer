chrome.runtime.onMessage.addListener(function (message) {
    if (message.pointerType) {
        onPointerTypeSelected(message.pointerType);
    } else if (message.command) {
        onShortcutUsed();
    }
});