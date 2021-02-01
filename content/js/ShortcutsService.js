class ShortcutsService {
    constructor(config) {
        this.keyToCommandConfig = config;
        this.commandToKeyConfig = Object.keys(config).reduce((obj, key) => {
            return {
                ...obj,
                [config[key]]: key,
            }
        }, {});
        this.onCommandTriggered = () => { };

        this.onKeydown = this.onKeydown.bind(this);
    }

    init(callback) {
        window.addEventListener('keydown', this.onKeydown);
        this.onCommandTriggered = callback;
    }

    onKeydown(e) {
        e.preventDefault();

        const command = this.commandToKeyConfig[e.code];
        if (!command) {
            return;
        }
        this.onCommandTriggered(command);
        window.removeEventListener('keydown', this.onKeydown);
    }
}