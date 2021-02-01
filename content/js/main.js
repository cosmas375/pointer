const pointersController = new PointersController(pointersMap);
const shortcutsService = new ShortcutsService(shortcutsConfig);

chrome.runtime.onMessage.addListener(function (message) {
    if (message.pointerType) {
        pointersController.triggerPointerByType(message.pointerType);
    } else if (message.command) {
        addInfoOverlay();
        shortcutsService.init(command => {
            hideInfoOverlay();
            if (command !== 'cancel') {
                pointersController.onCommand(command)
            }
        });
    }
});

function addInfoOverlay() {
    console.log('infoOverlay visible');
}
function hideInfoOverlay() {
    console.log('infoOverlay hidden');
}