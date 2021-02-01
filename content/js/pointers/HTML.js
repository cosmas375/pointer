class HTMLPointer extends BasePointer {
    constructor() {
        super();

        this.targetClassName = `${this.baseClassName}__html-target`; // sync w content.css
        this.targetSetClassName = `${this.targetClassName}_set`; // sync w content.css

        this.onMouseMove = this.onMouseMove.bind(this);
        this.onElementSelected = this.onElementSelected.bind(this);
    }

    init(callback) {
        window.addEventListener('mousemove', this.onMouseMove);
        document.documentElement.addEventListener('click', this.onElementSelected);

        this.onCreated = callback;
    }

    remove() {
        this.target.classList.remove(this.targetSetClassName);
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
        window.removeEventListener('mousemove', this.onMouseMove);
        document.documentElement.removeEventListener('click', this.onElementSelected);
        target.classList.add(this.targetSetClassName);

        this.target = target;

        this.onCreated(this);
    }

    clearAllHighlightedElements() {
        [...document.querySelectorAll('.' + this.targetClassName)].forEach(elem => {
            elem.classList.remove(this.targetClassName);
        });
    }
}