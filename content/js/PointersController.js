class PointersController {
    constructor(pointers) {
        this.pointers = pointers;
        this.createdPointers = [];

        this.addCreatedPointer = this.addCreatedPointer.bind(this);
    }

    triggerPointerByType(pointerType) {
        const PointerClass = this.pointers[pointerType];
        if (!PointerClass) {
            return;
        }
        const pointer = new PointerClass();
        pointer.init(this.addCreatedPointer);
    }

    addCreatedPointer(pointer) {
        this.createdPointers.push(pointer);
    }

    removeAllCreatedPointers() {
        this.createdPointers.forEach(pointer => pointer.remove());
        this.createdPointers = [];
    }

    onCommand(type) {
        switch (type) {
            case 'clear':
                this.removeAllCreatedPointers();
                break;
            default:
                this.triggerPointerByType(type);
                break;
        }
    }
}