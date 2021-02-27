import Container from './services/Container';

export default class PointersDipatcher {
    constructor({ pointersMap }) {
        this.pointersMap = pointersMap;

        this.container = new Container();
        this.historyBuffer = new Container();
    }

    add(pointerType) {
        const pointer = new this.pointersMap[pointerType]();
        pointer.init(pointer => this.container.push(pointer));
        this.historyBuffer.clear();
    }

    undo() {
        const pointer = this.container.pop();
        if (!pointer) {
            return;
        }
        pointer.unmount();
        this.historyBuffer.push(pointer);
    }

    redo() {
        const pointer = this.historyBuffer.pop();
        if (!pointer) {
            return;
        }
        pointer.mount();
        this.container.push(pointer);
    }

    clear() {
        const list = this.container.getList()
        list.forEach(item => item.destroy());

        this.container.clear();
        this.historyBuffer.clear();
    }
}