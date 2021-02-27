export default class PointersContainer {
    constructor() {
        this.list = [];
    }

    push(item) {
        return this.list.push(item);
    }

    pop() {
        return this.list.pop();
    }

    clear() {
        return this.list = [];
    }

    getList() {
        return this.list;
    }
}