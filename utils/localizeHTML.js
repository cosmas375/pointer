(function () {
    var components = document.querySelectorAll('[data-content]');

    if (!components) {
        return;
    }

    Array.from(components).forEach(component => {
        const translationKey = component.dataset.content;

        if (!translationKey.trim) {
            return;
        }

        const translation = chrome.i18n.getMessage(translationKey);
        if (translation) {
            component.innerText = translation;
        }
    });
})()