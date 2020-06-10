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
            if (dailyQuote != '' && (dailyQuoteExpirationDate != null && dailyQuoteExpirationDate != new Date().getDate())) {
                elem.innerHTML = dailyQuote;
                return;
            }

            fetch('https://api.paperquotes.com/quotes?language=en', {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => {
                if (!data.hasOwnProperty('results') || typeof data.results[0] != 'object') {
                    return;
                }

                const quoteDetails = data.results[(Math.floor(Math.random() * Object.keys(data).length) + 1)];

                if (typeof quoteDetails === 'undefined') {
                    return;
                }

                let quote = new String('<q>' + quoteDetails.quote + '</q>');
                let tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);

                if (quoteDetails.hasOwnProperty('author') && quoteDetails.author != null) {
                    quote += ('<small class="author">' + quoteDetails.author + '</small>');
                }

                localStorage.setItem('dailyQuote', quote);
                localStorage.setItem('dailyQuoteExpirationDate', tomorrow.getDate());
                elem.innerHTML = quote;
            })
            .catch(function (err) {
                console.log(err);
            })
            ;
        });
    }
}

window.addEventListener('load', function () {
    new DailyQuote('.daily-quote');
});
