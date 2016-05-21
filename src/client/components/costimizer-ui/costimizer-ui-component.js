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
                    this.results = results;

                    let sellerPromises = _.map(this.results, (result) => this._getSeller(result));

                    return Promise.all(sellerPromises);
                })
                .then(() => sipFn(this.results));
        });
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
    <div class="top" toggler="tglr" toggler-init="query">
        <div class="topbar">
            <div class="logo">
                <h3>Allegro Costimizer <span class="beta">beta</span></h3>
            </div>
            <div class="mainmenu">
                <ul class="mainmenu-list">
                    <li class="mainmenu-item">
                        <button class="mainmenu-link" ng-click="tglr.toggle('query')" ng-class="{'pressed': tglr.is('query')}">
                            <span class="button-label">Search</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <div class="drawer search-drawer" ng-show="tglr.is('query')">
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
controller.$inject = ["$scope", "allegroListingCrawler", "allegroSellerCrawler", "allegroCostimizer"];

const component = {
    template,
    controller,
    controllerAs: "ctrl",
    bindings: {}
};

CostimizerUiComponent.component = component;

export default CostimizerUiComponent;
export {CostimizerUiComponent};
