import _ from "lodash";

class VendorSale {
    constructor(costimizer) {
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
        let promises = _.map(searchSets, (searchSet) => this._sipListing(searchSet, handleSip));
        let promise = Promise.all(promises);

        promise.isAborted = false;
        promise.abort = () => {
            _.forEach(promises, (promise) => promise.abort());
            promise.isAborted = true;
        };

        return promise;
    }

    _sipListing(searchSet, handleSip) {
        return Promise.reject(); // abstract
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
        return Promise.reject(); // abstract
    }
}

VendorSale.service = (...args) => new VendorSale(...args);
VendorSale.service.$inject = ["costimizer"];

export default VendorSale;
export {VendorSale};
