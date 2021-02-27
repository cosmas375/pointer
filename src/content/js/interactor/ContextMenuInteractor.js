import Interactor from './_Interactor';

export default class ContextMenuInteractor extends Interactor {
    constructor({ dispatcher }) {
        super(dispatcher);
    }

    trigger(data) {
        this.execute(data);
    }
}