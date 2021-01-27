function HTMLPointer() { }

HTMLPointer.prototype.highlightedComponentClassName = 'pointer__target_html';

HTMLPointer.prototype.init = function () {
    window.addEventListener('mousemove', this.onMouseMove);
    document.documentElement.addEventListener('click', this.onElementSelected);
}

HTMLPointer.prototype.onMouseMove = (function (e) {
    const target = document.elementFromPoint(e.clientX, e.clientY);
    if (!target || target.classList.contains(this.highlightedComponentClassName)) {
        return;
    }
    this.clearAllHighlightedElements();
    target.classList.add(this.highlightedComponentClassName);
}).bind(HTMLPointer.prototype);

HTMLPointer.prototype.onElementSelected = (function (e) {
    e.preventDefault();
    var target = e.target;
    if (!target) {
        return;
    }
    this.clearAllHighlightedElements();
    window.removeEventListener('mousemove', this.onMouseMove);
    document.documentElement.removeEventListener('click', this.onElementSelected);
    target.classList.add(this.highlightedComponentClassName);
}).bind(HTMLPointer.prototype);

HTMLPointer.prototype.clearAllHighlightedElements = function () {
    Array.from(document.querySelectorAll('.' + this.highlightedComponentClassName)).forEach(elem => {
        elem.classList.remove(this.highlightedComponentClassName);
    });
}