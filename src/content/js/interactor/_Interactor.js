export default class Interactor {
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
    }

    execute({ command, params }) {
        switch (command) {
            case 'add':
                this.dispatcher.add(params);
                break;
            case 'undo':
                this.dispatcher.undo();
                break;
            case 'redo':
                this.dispatcher.redo();
                break;
            case 'clear':
                this.dispatcher.clear();
                break;
        }
    }
}