class PointersContainer {
    constructor() {
        this.createdPointers = [];

        this.addCreatedPointer = this.addCreatedPointer.bind(this);
    }

    initPointer(pointer) {
        pointer.init(this.addCreatedPointer);
    }

    addCreatedPointer(pointer) {
        this.createdPointers.push(pointer);
    }

    removeAllCreatedPointers() {
        this.createdPointers.forEach(pointer => pointer.remove());
        this.createdPointers = [];
    }
}