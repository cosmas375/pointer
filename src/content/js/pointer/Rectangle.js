import Pointer from './_Pointer';

const POINTER_TYPE = 'rectangle';

export default class RectanglePointer extends Pointer {
    static type = POINTER_TYPE;

    constructor(data) {
        super();
        this.type = POINTER_TYPE;
        this.componentClassName = `${this.baseClassName}__rectangle`; // sync w content.css

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

        this.createRectangleComponent();
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

        this.createRectangleComponent();
        this.updateTransform();

        this.removeFirstStepListeners();
        this.addSecondStepListeners();
    }

    createRectangleComponent() {
        const component = document.createElement('div');
        component.classList.add(this.componentClassName);
        document.body.appendChild(component);
        this.component = component;
    }
    updateTransform() {
        const { startX, startY, width, height, angle, scaleX } = this.getTransforms();
        const style = this.component.style;
        style.top = `${startY}px`;
        style.left = `${startX}px`;
        style.transform = `scale(${scaleX}, 1) rotate(${angle || 0}rad)`;
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

        let width;
        let height;
        let angle;
        let scaleX;
        if (horizontalProjection <= 0 && verticalProjection <= 0) { // bottom right
            angle = 0;
            scaleX = 1;
            width = Math.abs(horizontalProjection);
            height = Math.abs(verticalProjection);
        } else if (horizontalProjection <= 0 && verticalProjection > 0) { // top right
            angle = -Math.PI / 2;
            scaleX = 1;
            height = Math.abs(horizontalProjection);
            width = Math.abs(verticalProjection);
        } else if (horizontalProjection > 0 && verticalProjection > 0) { // top left
            angle = -Math.PI / 2;
            scaleX = -1;
            width = Math.abs(verticalProjection);
            height = Math.abs(horizontalProjection);
        } else { // bottom left
            angle = 0;
            scaleX = -1;
            height = Math.abs(verticalProjection);
            width = Math.abs(horizontalProjection);
        }

        return {
            startX,
            startY,
            width,
            height,
            angle,
            scaleX,
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