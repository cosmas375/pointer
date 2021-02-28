export default function getXPath(element) {
    if (element.id !== '') {
        return `id("${element.id}")`;
    }

    const getPath = element => {
        if (element.tagName === 'BODY') {
            return '/html/body';
        }
        let ix = 0;
        const siblings = element.parentNode.childNodes;
        for (let i = 0; i < siblings.length; i++) {
            const sibling = siblings[i];
            if (sibling === element) {
                return `${getPath(element.parentNode)}/${element.tagName}[${ix + 1}]`;
            }
            if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
                ix++;
            }
        }
    }

    return getPath(element).toLowerCase();
}