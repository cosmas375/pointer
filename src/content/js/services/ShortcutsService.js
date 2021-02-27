export default class ShortcutsService {
    constructor(config) {
        this.config = config;
        this.onKeydown = this.onKeydown.bind(this);
    }

    init(callback) {
        window.addEventListener('keydown', this.onKeydown);
        window.addEventListener('keyup', this.preventDefault);

        this.callback = typeof callback === 'function'
            ? callback
            : () => { };
    }

    destroy() {
        window.removeEventListener('keydown', this.onKeydown);
        window.removeEventListener('keyup', this.preventDefault);
    }

    onKeydown(e) {
        this.preventDefault(e);

        const data = this.config[e.code];
        if (!data) {
            return;
        }

        this.callback(data);
        this.destroy();
    }


    preventDefault(e) {
        e.preventDefault();
        e.stopPropagation();
    }
}