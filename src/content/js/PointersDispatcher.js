export default class PointersDipatcher {
    constructor({ container, pointersMap }) {
        this.container = container;
        this.pointersMap = pointersMap;
        this.historyBuffer = [];
    }

    add(pointerType) {
        const pointer = new this.pointersMap[pointerType]();
        pointer.init(pointer => this.container.push(pointer));
    }

    undo() {
        this.historyBuffer.push(this.container.pop());
    }

    redo() {
        this.container.push(this.historyBuffer.pop());
    }

    clear() {
        this.container.clear();
        this.historyBuffer = [];
    }
}