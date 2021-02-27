import Interactor from './_Interactor';
import ShortcutsService from '../services/ShortcutsService';

export default class ShortcutsInteractor extends Interactor {
    constructor({ config, dispatcher }) {
        super(dispatcher);
        this.config = config;
        this.onKeydown = this.onKeydown.bind(this);
    }

    trigger() {
        this.service = new ShortcutsService(this.config);
        this.service.init(this.onKeydown);
    }

    onKeydown(data) {
        const [command, params] = data.split('.');
        this.execute({ command, params });
    }
}