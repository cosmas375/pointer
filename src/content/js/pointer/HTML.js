import Pointer from './_Pointer';
import getXPath from '../helpers/getXPath';

const POINTER_TYPE = 'html';
export default class HTMLPointer extends Pointer {
    static type = POINTER_TYPE;

    constructor(data) {
        super();
        this.type = POINTER_TYPE;
        this.targetClassName = `${this.baseClassName}__html-target`; // sync w content.css
        this.targetSetClassName = `${this.targetClassName}_set`; // sync w content.css

        if (data) {
            this.createFromData(data);
        } else {
            this.onMouseMove = this.onMouseMove.bind(this);
            this.onElementSelected = this.onElementSelected.bind(this);
        }
    }

    init(callback) {
        this.addListeners();
        this.initCancellationShortcut();
        this.onCreated = callback;
    }
    destroy() {
        if (!this.target) {
            return;
        }
        this.target.classList.remove(this.targetSetClassName);
    }
    mount() {
        if (!this.target) {
            return;
        }
        this.target.classList.add(this.targetSetClassName);
    }
    unmount() {
        if (!this.target) {
            return;
        }
        this.target.classList.remove(this.targetSetClassName);
    }

    cancel() {
        this.clearAllHighlightedElements();
        this.removeListeners();
        this.removeCancellationShortcut();
        this.destroy();
    }

    createFromData(data) {
        const element = document.evaluate(data, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE).iterateNext();
        if (!element) {
            return;
        }
        this.target = element;
        this.mount();
    }

    getData() {
        return getXPath(this.target);
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
        document.documentElement.addEventListener('mousedown', this.preventDefault, { capture: true, once: true });
        document.documentElement.addEventListener('mouseup', this.preventDefault, { capture: true, once: true });
        document.documentElement.addEventListener('click', this.onElementSelected, { capture: true, once: true });
    }
    removeListeners() {
        window.removeEventListener('mousemove', this.onMouseMove);
        document.documentElement.removeEventListener('mousedown', this.preventDefault);
        document.documentElement.removeEventListener('mouseup', this.preventDefault);
        document.documentElement.removeEventListener('click', this.onElementSelected);
    }
}