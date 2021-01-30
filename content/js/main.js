chrome.runtime.onMessage.addListener(function (message) {
    if (message.pointerType) {
        onPointerTypeSelected(message.pointerType);
    } else if (message.command) {
        onShortcutUsed();
    }
});

var pointerContainer = createPointerContainer();
var coordsContainer = createCoordsContainer();

// pointer container
function createPointerContainer() {
    const pointerContainer = document.createElement('div');
    pointerContainer.classList.add('pointer-container');
    document.body.appendChild(pointerContainer);
    return pointerContainer;
}
function showPointerContainer() {
    pointerContainer.classList.add('pointer-container_visible');
}
function hidePointerContainer() {
    pointerContainer.classList.remove('pointer-container_visible');
}

// coords container
function createCoordsContainer() {
    const coordsContainer = document.createElement('div');
    coordsContainer.classList.add('coords-container');
    pointerContainer.appendChild(coordsContainer);
    return coordsContainer;
}
function onMouseMove(e) {
    const x = e.clientX;
    const y = e.clientY;
    coordsContainer.innerText = `x = ${x}\ny = ${y}`;
    coordsContainer.style.top = `${y}px`;
    coordsContainer.style.left = `${x}px`;
}



// entrypoint
function onShortcutUsed() {
    addInfoOverlay();
    window.addEventListener('keydown', listenForShortcutPointer);
}
function onPointerTypeSelected(pointerType) {
    switch (pointerType) {
        case 'arrow':
            initArrowPointing();
            (new ArrowPointer()).init();
            break;
        case 'rect':
            initRectanglePointing();
            break;
        case 'html':
            (new HTMLPointer()).init();
            break;
    }
}
// cancel
function onPointingCancelled(e) {
    if (!e.key === 'Escape') {
        return;
    }
    hidePointerContainer();
    window.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('keydown', onPointingCancelled);
}
// initiations
function initArrowPointing() {
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('keydown', onPointingCancelled);
}
function initRectanglePointing() {
    alert('rect');
}

function addInfoOverlay() {
    console.log('infoOverlay visible');
}
function hideInfoOverlay() {
    console.log('infoOverlay hidden');
}
function listenForShortcutPointer(e) {
    if (e.key === 'Escape') {
        hideInfoOverlay();
    } else if (e.code === 'KeyA') {
        onPointerTypeSelected('arrow');
    } else if (e.code === 'KeyR') {
        onPointerTypeSelected('rect');
    } else if (e.code === 'KeyH') {
        onPointerTypeSelected('html');
    } else if (e.code === 'KeyC') {
        removeALlPointers();
    } else {
        return;
    }
    window.removeEventListener('keydown', listenForShortcutPointer);
}


function removeALlPointers() {
    [...document.querySelectorAll('.pointer__target_html')].forEach(item => item.classList.remove('pointer__target_html'));
    [...document.querySelectorAll('.pointer-container__arrow')].forEach(item => item.remove());
}