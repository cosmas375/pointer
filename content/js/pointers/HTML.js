class HTMLPointer extends BasePointer {
    constructor() {
        super();

        this.targetClassName = `${this.baseClassName}__html-target`; // sync w content.css
        this.targetSetClassName = `${this.targetClassName}_set`; // sync w content.css

        this.onMouseMove = this.onMouseMove.bind(this);
        this.onElementSelected = this.onElementSelected.bind(this);
    }

    init(callback) {
        this.addListeners();

        this.onCreated = callback;
        this.initShortcuts();
    }

    remove() {
        if (!this.target) {
            return;
        }
        this.target.classList.remove(this.targetSetClassName);
    }

    cancel() {
        this.removeListeners();
        this.clearAllHighlightedElements();
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
        e.preventDefault();
        const target = e.target;
        if (!target) {
            return;
        }
        this.clearAllHighlightedElements();
        this.removeListeners();
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
        document.documentElement.addEventListener('click', this.onElementSelected);
    }
    removeListeners() {
        window.removeEventListener('mousemove', this.onMouseMove);
        document.documentElement.removeEventListener('click', this.onElementSelected);
    }
}