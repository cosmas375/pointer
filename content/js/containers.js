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
    alert('infoOverlay visible');
}
function hideInfoOverlay() {
    alert('infoOverlay hidden');
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
    } else {
        return;
    }
    window.removeEventListener('keydown', listenForShortcutPointer);
}