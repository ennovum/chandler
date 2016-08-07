const lang = {
    costimizerUi: {
        chandlerTitle: 'Chandler',
        betaLabel: 'beta'
    },
    costimizerUiIntro: {
        queryPlaceholder: 'Podaj frazę',
        searchLabel: 'Szukaj',
        searchAddLabel: 'Dodaj kolejne wyszukiwanie',
        introHTML: `
            <p>Witaj! <strong>Chandler</strong> pozwala szukać produktów w serwisach <strong>Allegro</strong> & <strong>Ceneo</strong> jednocześnie.</p>
            <p>Unikalną cechą <strong>Chandler</strong>-a jest to, że możesz mu zlecić <strong>wiele wyszukiwań</strong> i widzieć wyniki wyłącznie u <strong>sprzedawców oferujących wszystko</strong> czego szukasz.</p>
        `
    },
    costimizerUiQueries: {
        querySetPlaceholder: 'Popraw frazę',
        queryPlaceholder: 'Podaj frazę',
        queryAddPlaceholder: 'Podaj kolejną frazę',
        searchAddLabel: 'Dodaj kolejne wyszukiwanie'
    },
    costimizerUiResults: {
        sellersLabel: (count) => `Sprzedawcy (${count})`,
        offersLabel: (phrase) => `Oferty dla frazy "${phrase}"`,
        offersCountLabel: (count) => `Ofert: ${count}`,
        noResultsLabel: 'Brak wyników'
    },
    loading: {
        loadingLabel: 'Ładowanie...',
        abortLabel: 'Przerwij'
    }
};

export default lang;
export {lang};
