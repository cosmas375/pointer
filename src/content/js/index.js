import { POINTERS_MAP, SHORTCUTS_CONFIG, LOCAL_STORAGE_KEY } from './configs';

import PointersDispatcher from './PointersDispatcher';
import LocalStorage from './storage/ChromeLocalStirage';

import ShortcutsInteractor from './interactor/ShortcutsInteractor';
import PopupInteractor from './interactor/PopupInteractor';
import ContextMenuInteractor from './interactor/ContextMenuInteractor';

const storage = new LocalStorage({ key: `${LOCAL_STORAGE_KEY}_${window.location.href.replace(window.location.hash, '')}` });
const dispatcher = new PointersDispatcher({ pointersMap: POINTERS_MAP, storage });

const shortcutInteractor = new ShortcutsInteractor({
    config: SHORTCUTS_CONFIG,
    dispatcher,
});
const popupInteractor = new PopupInteractor({ dispatcher });
const contextMenuInteractor = new ContextMenuInteractor({ dispatcher });

const interactorsMap = {
    shortcut: shortcutInteractor,
    popup: popupInteractor,
    context: contextMenuInteractor,
};

chrome.runtime.onMessage.addListener(function (message) {
    const trigger = message.trigger;
    if (trigger) {
        interactorsMap[trigger].trigger(message.data);
    }
});