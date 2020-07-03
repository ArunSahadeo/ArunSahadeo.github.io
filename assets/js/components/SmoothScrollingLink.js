class SmoothScrollingLink {
    constructor (links) {
        if (typeof links === 'undefined') {
            return;
        }

        this.links = document.querySelectorAll(links);
        this.links.forEach(link => {
            link.addEventListener('click', this.initSmoothScroll);
        });
    }

    initSmoothScroll (e) {
        e.preventDefault();

        let
            link = e.target,
            hash = link.href.split('#')[1]
        ;

        let targetElem = document.querySelector('[id="' + hash + '"]');

        if (!targetElem) {
            return false;
        }

        let
            targetElemCoords = targetElem.getBoundingClientRect(),
            headerHeight = document.querySelector('header').offsetHeight
        ;

        window.scroll({
            top: parseInt(targetElemCoords['top'] - targetElemCoords['height'] - headerHeight),
            left: 0,
            behavior: 'smooth'
        });
    }
}

window.addEventListener('load', function () {
    new SmoothScrollingLink('a[href^="#"');
});
