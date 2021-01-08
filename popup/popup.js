const container = document.querySelector('.container');

container.addEventListener('click', e => {
    if (!e.target?.dataset?.pointerType) {
        return;
    }
});