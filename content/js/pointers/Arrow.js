var IMG_ASPECT_RATIO = 4.75;

function ArrowPointer() {
    this.startX = 0;
    this.startY = 0;
    this.endX = 0;
    this.endY = 0;
}

ArrowPointer.prototype.init = function () {
    this.startX = 0;
    this.startY = 0;
    this.endX = 0;
    this.endY = 0;
    this.container = document.createElement('div');
    document.documentElement.addEventListener('click', this.onStartPointSpecified);
}

ArrowPointer.prototype.onStartPointSpecified = (function (e) {
    e.preventDefault();

    this.startX = e.clientX;
    this.startY = document.documentElement.scrollTop + e.clientY;

    this.createArrowContainer();

    document.documentElement.removeEventListener('click', this.onStartPointSpecified);

    window.addEventListener('mousemove', this.updateArrowTransform);
    document.documentElement.addEventListener('click', this.onEndPointSpecified);
}).bind(ArrowPointer.prototype);

ArrowPointer.prototype.onEndPointSpecified = (function (e) {
    e.preventDefault();

    this.endX = e.clientX;
    this.endY = document.documentElement.scrollTop + e.clientY;

    window.removeEventListener('mousemove', this.updateArrowTransform);
    document.documentElement.removeEventListener('click', this.onEndPointSpecified);
}).bind(ArrowPointer.prototype);

ArrowPointer.prototype.updateArrowTransform = (function (e) {
    var x = e.clientX;
    var y = document.documentElement.scrollTop + e.clientY;

    var horizontalProjection = this.startX - x;
    var verticalProjection = this.startY - y;

    var diagonal = Math.sqrt(horizontalProjection ** 2 + verticalProjection ** 2);
    var height = diagonal / Math.sqrt(1 + IMG_ASPECT_RATIO ** 2);
    var width = height * IMG_ASPECT_RATIO;

    let angle;
    if (horizontalProjection === 0) {
        angle = verticalProjection > 0 ? Math.PI / 2 : -Math.PI / 2;
    } else {
        angle = (horizontalProjection > 0 ? 0 : Math.PI) + Math.atan(verticalProjection / horizontalProjection);
    }

    this.container.style.transform = `translate(-100%, 0) rotate(${angle || 0}rad)`;
    this.container.style.transformOrigin = 'right center';

    this.container.style.height = `${height}px`;
    this.container.style.width = `${width}px`;
}).bind(ArrowPointer.prototype);


ArrowPointer.prototype.createArrowContainer = function () {
    this.container = document.createElement('div');
    this.container.classList.add('pointer-container__arrow');
    this.container.style.backgroundImage = `url(${chrome.extension.getURL('/images/svg/arrow.svg')})`;
    this.container.style.top = `${this.startY}px`;
    this.container.style.left = `${this.startX}px`;
    document.body.appendChild(this.container);
}