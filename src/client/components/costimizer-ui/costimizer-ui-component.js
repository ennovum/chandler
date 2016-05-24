import _ from "lodash";

class CostimizerUiComponent {
    constructor($scope, listingCrawler, sellerCrawler, costimizer) {
        this._$scope = $scope;
        this._listingCrawler = listingCrawler;
        this._sellerCrawler = sellerCrawler;
        this._costimizer = costimizer;

        this.on = {
            submitQueries: (queries) => this.submitQueries(queries),
            abortQueries: () => this.abortQueries()
        };

        this.queries = null;
        this.results = null;

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

        this.sipListingPromises = _.map(this.searchSets, (searchSet) => this._sipListing(searchSet, () => {
            this._$scope.$apply(); // async promise
        }));

        this.sipListingAllPromise = Promise.all(this.sipListingPromises)
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
                        return Promise.resolve(this.results);
                    }

                    this.results = results;

                    let sellerPromises = _.map(this.results, (result) => this._getSeller(result));

                    return Promise.all(sellerPromises);
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

    _getSeller(result) {
        return this._sellerCrawler.getListingOfferSeller(result.seller.id)
            .then((seller) => {
                result.seller = seller;
            });
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
controller.$inject = ["$scope", "allegroListingCrawler", "allegroSellerCrawler", "costimizer"];

const component = {
    template,
    controller,
    controllerAs: "ctrl",
    bindings: {}
};

CostimizerUiComponent.component = component;

export default CostimizerUiComponent;
export {CostimizerUiComponent};
