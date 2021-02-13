class ShortcutsService {
    constructor(config) {
        this.config = config;
        this.onCommandTriggered = () => { };

        this.onKeydown = this.onKeydown.bind(this);
    }

    init(callback) {
        window.addEventListener('keydown', this.onKeydown);
        this.onCommandTriggered = callback;
    }

    destroy() {
        window.removeEventListener('keydown', this.onKeydown);
    }

    onKeydown(e) {
        e.preventDefault();

        const command = this.config[e.code];
        if (!command) {
            return;
        }
        this.onCommandTriggered(command);
        this.destroy();
    }
}