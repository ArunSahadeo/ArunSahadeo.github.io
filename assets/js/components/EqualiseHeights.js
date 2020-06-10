class EqualiseHeights {
    constructor (elems) {
        if (typeof elems === 'undefined') {
            return;
        }
        
        this.elems = document.querySelectorAll(elems);
        this.equaliseHeights();

        window.addEventListener('resize', this.equaliseHeights.bind(this));
    }

    equaliseHeights () {
        this.elems.forEach((elem) => {
            var maxHeight = 0;

            if (typeof elem.dataset.targets != 'undefined') {
                var targets = elem.querySelectorAll(elem.dataset.targets);
            } else {
                var targets = elem;
            }

            targets.forEach((target) => {
                if (target.offsetHeight > maxHeight) {
                    maxHeight = target.offsetHeight;
                }

                if (maxHeight > 0) {
                    target.style.height = new String(maxHeight + 'px');
                }
            });
        });
    }
}

window.addEventListener('load', function () {
    new EqualiseHeights('.equalise-heights');
});
