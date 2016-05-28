import _ from "lodash";

const RESULTS_DEBOUNCE_SPAN = 5000;

class CostimizerUiComponent {
    constructor($scope, listingCrawler, sellerCrawler, costimizer, debouncer) {
        this._$scope = $scope;
        this._listingCrawler = listingCrawler;
        this._sellerCrawler = sellerCrawler;
        this._costimizer = costimizer;
        this._debouncer = debouncer;

        this.on = {
            submitQueries: (queries) => this.submitQueries(queries),
            abortQueries: () => this.abortQueries()
        };

        this.queries = null;
        this.results = null;

        this.sipSalePromises = null;
        this.sipSaleAllPromise = null;
    }

    submitQueries(queries) {
        this.queries = queries;
        this.results = null;

        let resultsDebounce = this._debouncer.create({span: RESULTS_DEBOUNCE_SPAN});

        this.abortQueries();

        this.sipSalePromises = this._sipSale(queries, (results) => {
            this._applyResults(results, resultsDebounce);
        });

        this.sipSaleAllPromise = Promise.all(this.sipSalePromises)
            .then(() => {
                this._debouncer.destroy(resultsDebounce);
            })
            .catch((err) => {
                console.error(err); // TODO
            });
    }

    _sipSale(queries, handleSip) {
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
        return this._listingCrawler.sipListing(searchSet.query, (result) => {
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

    _applyResults(results, resultsDebounce) {
        resultsDebounce.queue(() => {
            this.results = results;
            this._$scope.$apply(); // async debounce
        });
    }

    _getSeller(result) {
        return this._sellerCrawler.getListingOfferSeller(result.seller.id);
    }

    abortQueries() {
        if (!this.sipSalePromises) {
            return;
        }

        _.forEach(this.sipSalePromises, (salePromise) => {
            salePromise.abort();
        });

        this.sipSalePromises = null;
    }
}

const template = `
    <div class="top">
        <div class="topbar">
            <div class="logo">
                <h3>Costimizer <span class="beta">beta</span></h3>
            </div>
        </div>
        <div class="drawer search-drawer">
            <div class="drawer-body">
                <costimizer-ui-queries queries="ctrl.queries" on-submit="ctrl.on.submitQueries(queries)"></costimizer-ui-queries>
            </div>
        </div>
    </div>
    <div class="main">
        <div class="content-box">
            <loading promise="ctrl.sipSaleAllPromise" is-abortable="true" on-abort="ctrl.on.abortQueries()"></loading>
            <costimizer-ui-results queries="ctrl.queries" results="ctrl.results"></costimizer-ui-results>
        </div>
    </div>
`;

const controller = (...args) => new CostimizerUiComponent(...args);
controller.$inject = ["$scope", "allegroListingCrawler", "allegroSellerCrawler", "costimizer", "debouncer"];

const component = {
    template,
    controller,
    controllerAs: "ctrl",
    bindings: {}
};

CostimizerUiComponent.component = component;

export default CostimizerUiComponent;
export {CostimizerUiComponent};
