const lang = {
    costimizerUi: {
        chandlerTitle: 'Chandler',
        betaLabel: 'beta'
    },
    costimizerUiIntro: {
        queryPlaceholder: 'Enter query',
        searchLabel: 'Search',
        searchAddLabel: 'Add another search',
        introHTML: `
            <p>Welcome! <strong>Chandler</strong> lets you search products on <strong>Allegro</strong> & <strong>Ceneo</strong> in one place.</p>
            <p>What is uniqe about <strong>Chandler</strong> is that you can specify <strong>multiple searches</strong> and you will receive results from <strong>sellers that offer everything</strong> you are looking for.</p>
        `
    },
    costimizerUiQueries: {
        querySetPlaceholder: 'Set the query',
        queryPlaceholder: 'Enter a query',
        queryAddPlaceholder: 'Enter another query',
        searchAddLabel: 'Add another search'
    },
    costimizerUiResults: {
        sellersLabel: (count) => `Sellers (${count})`,
        offersLabel: (phrase) => `Offers for query "${phrase}"`,
        offersCountLabel: (count) => `Offers: ${count}`,
        noResultsLabel: 'No results'
    },
    loading: {
        loadingLabel: 'Loading...',
        abortLabel: 'Stop'
    }
};

export default lang;
export {lang};
