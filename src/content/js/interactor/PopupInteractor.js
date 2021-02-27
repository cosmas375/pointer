import Interactor from './_Interactor';

export default class PopupInteractor extends Interactor {
    constructor({ dispatcher }) {
        super(dispatcher);
    }

    trigger(data) {
        this.execute(data);
    }
}