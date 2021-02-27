import { POINTERS_MAP, SHORTCUTS_CONFIG } from '../../configs';

import PointersContainer from './PointersContainer';
import PointersDispatcher from './PointersDispatcher';

import ShortcutsInteractor from './interactor/ShortcutsInteractor';
import PopupInteractor from './interactor/PopupInteractor';
import ContextMenuInteractor from './interactor/ContextMenuInteractor';


const container = new PointersContainer();
const dispatcher = new PointersDispatcher({ container, pointersMap: POINTERS_MAP });

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