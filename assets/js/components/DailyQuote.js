class DailyQuote {
    constructor (elems) {
        if (typeof elems === 'undefined') {
            return;
        }

        this.elems = document.querySelectorAll(elems);

        if (localStorage.getItem('dailyQuote')) {
            this.dailyQuote = localStorage.getItem('dailyQuote');
            this.dailyQuoteExpirationDate = localStorage.getItem('dailyQuoteExpirationDate');
        }

        this.fetchDailyQuote();
    }

    fetchDailyQuote () {
        if (this.elems.length < 1) {
            return;
        }

        const dailyQuote = this.dailyQuote;
        const dailyQuoteExpirationDate = this.dailyQuoteExpirationDate;

        this.elems.forEach(function (elem) {
            if (dailyQuote != '' && typeof dailyQuoteExpirationDate != 'undefined' && dailyQuoteExpirationDate != new Date().getDate()) {
                elem.innerHTML = dailyQuote;
                return;
            }

            fetch('https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => {
                if (!data.hasOwnProperty('quoteText')) {
                    return;
                }

                let quote = new String('<q cite="' + data.quoteLink + '">' + data.quoteText + '</q>');
                let tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);

                if (data.hasOwnProperty('quoteAuthor')) {
                    quote += ('<small class="author">' + data.quoteAuthor + '</small>');
                }

                localStorage.setItem('dailyQuote', quote);
                localStorage.setItem('dailyQuoteExpirationDate', tomorrow);
                elem.innerHTML = quote;
            })
            ;
        });
    }
}

window.addEventListener('load', function () {
    new DailyQuote('.daily-quote');
});
