import Pointer from './_Pointer';

export default class HTMLPointer extends Pointer {
    constructor() {
        super();

        this.targetClassName = `${this.baseClassName}__html-target`; // sync w content.css
        this.targetSetClassName = `${this.targetClassName}_set`; // sync w content.css

        this.onMouseMove = this.onMouseMove.bind(this);
        this.onElementSelected = this.onElementSelected.bind(this);
    }

    init(callback) {
        this.addListeners();
        this.initCancellationShortcut();
        this.onCreated = callback;
    }

    remove() {
        if (!this.target) {
            return;
        }
        this.target.classList.remove(this.targetSetClassName);
    }

    cancel() {
        this.clearAllHighlightedElements();
        this.removeListeners();
        this.removeCancellationShortcut();
        this.remove();
    }

    onMouseMove(e) {
        const target = document.elementFromPoint(e.clientX, e.clientY);
        if (!target || target.classList.contains(this.targetClassName)) {
            return;
        }
        this.clearAllHighlightedElements();
        target.classList.add(this.targetClassName);
    }

    onElementSelected(e) {
        this.preventDefault(e);
        const target = e.target;
        if (!target) {
            return;
        }
        this.clearAllHighlightedElements();
        this.removeListeners();
        this.removeCancellationShortcut();
        target.classList.add(this.targetSetClassName);

        this.target = target;

        this.onCreated(this);
    }

    clearAllHighlightedElements() {
        [...document.querySelectorAll('.' + this.targetClassName)].forEach(elem => {
            elem.classList.remove(this.targetClassName);
        });
    }

    addListeners() {
        window.addEventListener('mousemove', this.onMouseMove);
        document.documentElement.addEventListener('mousedown', this.preventDefault);
        document.documentElement.addEventListener('mouseup', this.preventDefault);
        document.documentElement.addEventListener('click', this.onElementSelected);
    }
    removeListeners() {
        window.removeEventListener('mousemove', this.onMouseMove);
        document.documentElement.removeEventListener('mousedown', this.preventDefault);
        document.documentElement.removeEventListener('mouseup', this.preventDefault);
        document.documentElement.removeEventListener('click', this.onElementSelected);
    }
}