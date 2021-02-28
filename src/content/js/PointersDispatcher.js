import Container from './services/Container';

export default class PointersDipatcher {
    constructor({ pointersMap, storage }) {
        this.pointersMap = pointersMap;
        this.storage = storage;

        this.container = new Container();
        this.historyBuffer = new Container();
    }

    add(pointerType, data) {
        const pointer = new this.pointersMap[pointerType](data);
        if (data) {
            this.container.push(pointer)
        } else {
            pointer.init(pointer => this.container.push(pointer));
        }
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

    saveData() {
        const data = this.container.getList()
            .map(pointer => ({ type: pointer.type, data: pointer.getData() }));
        console.log(data);
        this.storage.saveData(data);
    }
    restoreData() {
        this.storage.getData(data => {
            if (!data) {
                return;
            }
            console.log(data);
            data.forEach(({ type, data }) => {
                this.add(type, data);
            });
        });
    }
}