import _ from 'lodash';

class VendorSale {
    constructor(costimizer) {
        this._costimizer = costimizer;
    }

    sipSale(queries, handleSip) {
        let searchSets = _.map(queries, (query, index) => {
            let items = [];
            let progress = 0;

            return {query, index, items, progress};
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

                    let progress = _.sum(searchSets, (searchSet) => searchSet.progress) / searchSets.length;
                    let sale = {results, progress};

                    return this._decorateSale(sale)
                        .then((sale) => handleSip(sale));
                });
        });
    }

    _sipListings(searchSets, handleSip) {
        let promises = _.map(searchSets, (searchSet) => {
            return this._sipListing(searchSet, (result) => {
                searchSet.items = searchSet.items.concat(result.data.offers);
                searchSet.progress = (result.meta.page + 1) / result.meta.pageCount;

                return handleSip(searchSet);
            });
        });

        let promise = Promise.all(promises);

        promise.isAborted = false;
        promise.abort = () => {
            _.forEach(promises, (promise) => promise.abort());
            promise.isAborted = true;
        };

        return promise;
    }

    _sipListing(searchSet, handleSip) {
        let query = searchSet.query;

        let checkAborted = () => promise.isAborted;
        let promise = this._sipListingTail(query, 0, handleSip, checkAborted);

        promise.isAborted = false;
        promise.abort = () => {
            promise.isAborted = true;
        };

        return promise;
    }

    _sipListingTail(query, page, handleSip, checkAborted) {
        return this._fetchListingPage(query, page)
            .then((result) => {
                let isAborted = checkAborted();
                let hasNextPage = (result.meta.page + 1) < result.meta.pageCount;

                if (!isAborted && hasNextPage) {
                    return Promise.resolve(handleSip(result, false))
                        .then(() => this._sipListingTail(query, page + 1, handleSip, checkAborted));
                }
                else {
                    return Promise.resolve(handleSip(result, true));
                }
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

    _decorateSale(sale) {
        return Promise.resolve(sale);
    }
}

VendorSale.service = (...args) => new VendorSale(...args);
VendorSale.service.$inject = ['costimizer'];

export default VendorSale;
export {VendorSale};
