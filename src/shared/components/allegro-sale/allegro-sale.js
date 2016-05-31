import _ from "lodash";

class AllegroSale {
    constructor(allegroListingCrawler, allegroSellerCrawler, costimizer) {
        this._allegroListingCrawler = allegroListingCrawler;
        this._allegroSellerCrawler = allegroSellerCrawler;
        this._costimizer = costimizer;
    }

    sipSale(queries, handleSip) {
        let searchSets = _.map(queries, (query, index) => {
            let items = [];
            return {query, index, items};
        });
        let lastResults = null;

        return this._sipListings(searchSets, (searchSet) => {
            searchSets[searchSet.index] = searchSet;

            return this._costimizeListings(searchSets)
                .then((results) => {
                    let isEqual = this._compareResults(results, lastResults);
                    if (isEqual) {
                        return Promise.resolve(lastResults);
                    }

                    lastResults = results;

                    return this._decorateResults(results)
                        .then(() => handleSip(results));
                });
        });
    }

    _sipListings(searchSets, handleSip) {
        return _.map(searchSets, (searchSet) => this._sipListing(searchSet, handleSip));
    }

    _sipListing(searchSet, handleSip) {
        return this._allegroListingCrawler.sipListing(searchSet.query, (result) => {
            searchSet.items = searchSet.items.concat(result.data.offers);

            return handleSip(searchSet);
        });
    }

    _costimizeListings(searchSets) {
        return this._costimizer.costimizeSearch(searchSets);
    }

    _compareResults(results, otherResults) {
        if (results === otherResults) {
            return true;
        }

        if (results === null || otherResults === null) {
            return false;
        }

        let resultsCountEqual = results.length === otherResults.length;
        if (!resultsCountEqual) {
            return false;
        }

        let itemsCountEqual = _.every(results, (result, resultIndex) => {
            return _.every(result.offers, (offer, offerIndex) => {
                return offer.items.length === otherResults[resultIndex].offers[offerIndex].items.length;
            });
        });
        if (!itemsCountEqual) {
            return false;
        }

        return true;
    }

    _decorateResults(results) {
        let sellerPromises = _.map(results, (result) => {
            return this._getSeller(result)
                .then((seller) => result.seller = seller);
        });

        return Promise.all(sellerPromises)
            .then(() => results);
    }

    _getSeller(result) {
        return this._allegroSellerCrawler.getListingOfferSeller(result.seller.id);
    }
}

AllegroSale.service = (...args) => new AllegroSale(...args);
AllegroSale.service.$inject = ["allegroListingCrawler", "allegroSellerCrawler", "costimizer"];

export default AllegroSale;
export {AllegroSale};
