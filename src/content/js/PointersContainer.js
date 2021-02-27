export default class PointersContainer {
    constructor() {
        this.pointers = [];
    }

    push(pointer) {
        return this.pointers.push(pointer);
    }

    pop() {
        return this.pointers.pop();
    }

    clear() {
        return this.pointers = [];
    }

    getList() {
        return this.pointers;
    }
}