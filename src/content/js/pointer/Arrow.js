import Pointer from './_Pointer';

const ARROW_IMG = chrome.extension.getURL('/images/svg/arrow.svg');
const IMG_ASPECT_RATIO = 4.75;

export default class ArrowPointer extends Pointer {
    constructor() {
        super();

        this.componentClassName = `${this.baseClassName}__arrow`; // sync w content.css

        this.onStartPointSpecified = this.onStartPointSpecified.bind(this);
        this.updateArrowTransform = this.updateArrowTransform.bind(this);
        this.onEndPointSpecified = this.onEndPointSpecified.bind(this);
    }

    init(callback) {
        this.startX = 0;
        this.startY = 0;
        this.endX = 0;
        this.endY = 0;
        this.onCreated = callback;

        this.addFirstStepListeners();
        this.initCancellationShortcut();
    }

    remove() {
        if (!this.component) {
            return;
        }
        this.component.remove();
    }

    cancel() {
        this.removeFirstStepListeners();
        this.removeSecondStepListeners();
        this.removeCancellationShortcut();
        this.remove();
    }

    onStartPointSpecified(e) {
        this.preventDefault(e);

        this.startX = e.clientX;
        this.startY = document.documentElement.scrollTop + e.clientY;

        this.createArrowComponent();

        this.removeFirstStepListeners();
        this.addSecondStepListeners();
    }

    createArrowComponent() {
        const component = document.createElement('div');
        component.classList.add(this.componentClassName);
        component.style.backgroundImage = `url(${ARROW_IMG})`;
        component.style.top = `${this.startY}px`;
        component.style.left = `${this.startX}px`;
        document.body.appendChild(component);

        this.component = component;
    }

    updateArrowTransform(e) {
        const x = e.clientX;
        const y = document.documentElement.scrollTop + e.clientY;

        const horizontalProjection = this.startX - x;
        const verticalProjection = this.startY - y;

        const diagonal = Math.sqrt(horizontalProjection ** 2 + verticalProjection ** 2);
        const height = diagonal / Math.sqrt(1 + IMG_ASPECT_RATIO ** 2);
        const width = height * IMG_ASPECT_RATIO;

        let angle;
        if (horizontalProjection === 0) {
            angle = verticalProjection > 0 ? Math.PI / 2 : -Math.PI / 2;
        } else {
            angle = (horizontalProjection > 0 ? 0 : Math.PI) + Math.atan(verticalProjection / horizontalProjection);
        }

        this.component.style.transform = `translate(-100%, -50%) rotate(${angle || 0}rad)`;
        this.component.style.transformOrigin = 'right center';

        this.component.style.height = `${height}px`;
        this.component.style.width = `${width}px`;
    }

    onEndPointSpecified(e) {
        this.preventDefault(e);

        this.endX = e.clientX;
        this.endY = document.documentElement.scrollTop + e.clientY;

        this.removeSecondStepListeners();
        this.removeCancellationShortcut();

        this.onCreated(this);
    }


    addFirstStepListeners() {
        document.documentElement.addEventListener('mousedown', this.preventDefault);
        document.documentElement.addEventListener('mouseup', this.preventDefault);
        document.documentElement.addEventListener('click', this.onStartPointSpecified);
    }
    addSecondStepListeners() {
        window.addEventListener('mousemove', this.updateArrowTransform);
        document.documentElement.addEventListener('mousedown', this.preventDefault);
        document.documentElement.addEventListener('mouseup', this.preventDefault);
        document.documentElement.addEventListener('click', this.onEndPointSpecified);
    }

    removeFirstStepListeners() {
        document.documentElement.removeEventListener('mousedown', this.preventDefault);
        document.documentElement.removeEventListener('mouseup', this.preventDefault);
        document.documentElement.removeEventListener('click', this.onStartPointSpecified);
    }
    removeSecondStepListeners() {
        window.removeEventListener('mousemove', this.updateArrowTransform);
        document.documentElement.removeEventListener('mousedown', this.preventDefault);
        document.documentElement.removeEventListener('mouseup', this.preventDefault);
        document.documentElement.removeEventListener('click', this.onEndPointSpecified);
    }
}