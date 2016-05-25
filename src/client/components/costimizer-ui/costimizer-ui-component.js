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

        this._resultsDebounce = null;

        this.sipListingPromises = null;
        this.sipListingAllPromise = null;
    }

    submitQueries(queries) {
        this.queries = queries;
        this.results = null;

        this.searchSets = _.map(this.queries, (query) => ({
            "query": query,
            "items": []
        }));

        this._resultsDebounce = this._debouncer.create({span: RESULTS_DEBOUNCE_SPAN});

        this.sipListingPromises = _.map(this.searchSets, (searchSet) => this._sipListing(searchSet, () => {
            this._$scope.$apply(); // async promise
        }));

        this.sipListingAllPromise = Promise.all(this.sipListingPromises)
            .then(() => {
                this._debouncer.destroy(this._resultsDebounce);
                this._resultsDebounce = null;
            })
            .catch((err) => {
                console.error(err); // TODO
            });
    }

    _sipListing(searchSet, sipFn) {
        return this._listingCrawler.sipListing(searchSet.query, (result) => {
            searchSet.items = searchSet.items.concat(result.data.offers);

            return this._costimizer.costimizeSearch(this.searchSets)
                .then((results) => {
                    let isEqual = _.isEqual(results, this.results, (results, otherResults) => this._compareResults(results, otherResults));
                    if (isEqual) {
                        return Promise.resolve();
                    }

                    let sellerPromises = _.map(results, (result) => {
                        return this._getSeller(result)
                            .then((seller) => result.seller = seller);
                    });

                    return Promise.all(sellerPromises)
                        .then(() => this._applyResults(results));
                })
                .then(() => sipFn(this.results));
        });
    }

    _compareResults(results, otherResults) {
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

    _applyResults(results) {
        this._resultsDebounce.queue(() => {
            this.results = results;
            this._$scope.$apply(); // async debounce
        });
    }

    _getSeller(result) {
        return this._sellerCrawler.getListingOfferSeller(result.seller.id);
    }

    abortQueries() {
        _.forEach(this.sipListingPromises, (sipPromise) => {
            sipPromise.abort();
        });

        this.sipListingPromises = null;
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
            <loading promise="ctrl.sipListingAllPromise" is-abortable="true" on-abort="ctrl.on.abortQueries()"></loading>
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
