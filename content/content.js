chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (!message.pointerType) {
        return;
    }
    createPointerContainer();
    createCoordsContainer();
    document.addEventListener('keydown', onPointingCancelled);
});

var pointerContainerId = 'pointerContainer';
var coordsContainerId = 'pointerContainer';

// pointer container
function createPointerContainer() {
    const pointerContainer = document.createElement('div');
    pointerContainer.classList.add('pointer-container');
    pointerContainer.id = pointerContainerId;
    document.body.appendChild(pointerContainer);
}
function removePointerContainer() {
    var container = document.getElementById(pointerContainerId);
    if (container) {
        container.remove();
    }
    document.removeEventListener('keydown', removePointerContainer);
}

// coords container
function createCoordsContainer() {
    const coordsContainer = document.createElement('div');
    coordsContainer.classList.add('coords-container');
    coordsContainer.id = coordsContainerId;
    document.body.appendChild(coordsContainer);
}
function removeCoordsContainer() {
    var container = document.getElementById(coordsContainerId);
    if (container) {
        container.remove();
    }
    document.removeEventListener('keydown', removeCoordsContainer);
}

// cancel
function onPointingCancelled(e) {
    if (!e.key === 'Escape') {
        return;
    }
    removeCoordsContainer();
    removePointerContainer();
    document.removeEventListener('keydown', onPointingCancelled);
}