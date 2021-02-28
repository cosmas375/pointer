import Pointer from './_Pointer';

const IMG_ASPECT_RATIO = 4.75;
const POINTER_TYPE = 'arrow';

export default class ArrowPointer extends Pointer {
    static type = POINTER_TYPE;

    constructor(data) {
        super();
        this.type = POINTER_TYPE;
        this.componentClassName = `${this.baseClassName}__arrow`; // sync w content.css

        if (data) {
            this.createFromData(data);
        } else {
            this.onStartPointSpecified = this.onStartPointSpecified.bind(this);
            this.onEndPointSpecified = this.onEndPointSpecified.bind(this);
            this.omMouseMove = this.omMouseMove.bind(this);
        }
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
    destroy() {
        if (!this.component) {
            return;
        }
        this.component.remove();
    }
    mount() {
        if (!this.component) {
            return;
        }
        this.component.style.display = 'block';
    }
    unmount() {
        if (!this.component) {
            return;
        }
        this.component.style.display = 'none';
    }

    cancel() {
        this.removeFirstStepListeners();
        this.removeSecondStepListeners();
        this.removeCancellationShortcut();
        this.destroy();
    }

    createFromData(data) {
        this.startX = data.startX;
        this.startY = data.startY;
        this.endX = data.endX;
        this.endY = data.endY;

        this.createArrowComponent();
        this.updateTransform();
    }

    getData() {
        return {
            startX: this.startX,
            startY: this.startY,
            endX: this.endX,
            endY: this.endY,
        };
    }

    onStartPointSpecified(e) {
        this.preventDefault(e);

        const x = e.clientX;
        const y = document.documentElement.scrollTop + e.clientY;
        this.startX = x;
        this.startY = y;
        this.endX = x;
        this.endY = y;

        this.createArrowComponent();
        this.updateTransform();

        this.removeFirstStepListeners();
        this.addSecondStepListeners();
    }

    createArrowComponent() {
        const component = document.createElement('div');
        component.classList.add(this.componentClassName);
        document.body.appendChild(component);
        this.component = component;
    }
    updateTransform() {
        const { startX, startY, width, height, angle } = this.getTransforms();
        const style = this.component.style;
        style.top = `${startY}px`;
        style.left = `${startX}px`;
        style.transform = `translate(-100%, -50%) rotate(${angle || 0}rad)`;
        style.height = `${height}px`;
        style.width = `${width}px`;
    }

    omMouseMove(e) {
        this.endX = e.clientX;
        this.endY = document.documentElement.scrollTop + e.clientY;
        this.updateTransform();
    }

    getTransforms() {
        const { startX, startY, endX, endY } = this;

        const horizontalProjection = startX - endX;
        const verticalProjection = startY - endY;

        const diagonal = Math.sqrt(horizontalProjection ** 2 + verticalProjection ** 2);
        const height = diagonal / Math.sqrt(1 + IMG_ASPECT_RATIO ** 2);
        const width = height * IMG_ASPECT_RATIO;

        let angle;
        if (horizontalProjection === 0) {
            angle = verticalProjection > 0 ? Math.PI / 2 : -Math.PI / 2;
        } else {
            angle = (horizontalProjection > 0 ? 0 : Math.PI) + Math.atan(verticalProjection / horizontalProjection);
        }

        return {
            startX,
            startY,
            width,
            height,
            angle,
        };
    }

    onEndPointSpecified(e) {
        this.preventDefault(e);

        this.omMouseMove(e);

        this.removeSecondStepListeners();
        this.removeCancellationShortcut();

        this.onCreated(this);
    }


    addFirstStepListeners() {
        document.documentElement.addEventListener('mousedown', this.preventDefault, { capture: true, once: true });
        document.documentElement.addEventListener('mouseup', this.preventDefault, { capture: true, once: true });
        document.documentElement.addEventListener('click', this.onStartPointSpecified, { capture: true, once: true });
    }
    removeFirstStepListeners() {
        document.documentElement.removeEventListener('mousedown', this.preventDefault);
        document.documentElement.removeEventListener('mouseup', this.preventDefault);
        document.documentElement.removeEventListener('click', this.onStartPointSpecified);
    }

    addSecondStepListeners() {
        window.addEventListener('mousemove', this.omMouseMove);
        document.documentElement.addEventListener('mousedown', this.preventDefault, { capture: true, once: true });
        document.documentElement.addEventListener('mouseup', this.preventDefault, { capture: true, once: true });
        document.documentElement.addEventListener('click', this.onEndPointSpecified, { capture: true, once: true });
    }
    removeSecondStepListeners() {
        window.removeEventListener('mousemove', this.omMouseMove);
        document.documentElement.removeEventListener('mousedown', this.preventDefault);
        document.documentElement.removeEventListener('mouseup', this.preventDefault);
        document.documentElement.removeEventListener('click', this.onEndPointSpecified);
    }
}