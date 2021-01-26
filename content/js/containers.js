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
    const x = e.offsetX;
    const y = e.offsetY;
    coordsContainer.innerText = `x = ${x}\ny = ${y}`;
    coordsContainer.style.top = `${y}px`;
    coordsContainer.style.left = `${x}px`;
}



// entrypoint
function onPointerTypeSelected() {
    showPointerContainer();
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('keydown', onPointingCancelled);
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