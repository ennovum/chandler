import _ from "lodash";

class CostimizerUiComponent {
    constructor($scope, allegroListingCrawler, allegroCostimizer) {
        this._$scope = $scope;
        this._listingCrawler = allegroListingCrawler;
        this._costimizer = allegroCostimizer;

        this.model = {
            queries: [""]
        };

        this.on = {
            submitQueries: () => this.submitQueries(),
            abortQueries: () => this.abortQueries()
        };

        this.queries = null;
        this.results = null;

        this.sipPromises = null;
        this.sipAllPromise = null;
    }

    submitQueries() {
        this.queries = _.clone(this.model.queries);
        this.results = null;

        let searchSets = _.map(this.queries, (query) => ({
            "query": query,
            "items": []
        }));

        this.sipPromises = _.map(searchSets, (searchSet) => this._listingCrawler.sipListing(searchSet.query, (result) => {
            searchSet.items = searchSet.items.concat(result.data.offers);

            return this._costimizer.costimizeSearch(searchSets)
                .then((results) => {
                    this.results = results;
                    this._$scope.$apply(); // async promise
                });
        }));

        this.sipAllPromise = Promise.all(this.sipPromises)
            .then(() => {
                // nothing
            })
            .catch((err) => {
                console.error(err); // TODO
            });
    }

    abortQueries() {
        _.forEach(this.sipPromises, (sipPromise) => {
            sipPromise.abort();
        });

        this.sipPromises = null;
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
                <costimizer-ui-queries model="ctrl.model" on-submit="ctrl.on.submitQueries()"></costimizer-ui-queries>
            </div>
        </div>
    </div>
    <div class="main">
        <div class="content-box">
            <loading promise="ctrl.sipAllPromise" is-abortable="true" on-abort="ctrl.on.abortQueries()"></loading>
            <costimizer-ui-results queries="ctrl.queries" results="ctrl.results"></costimizer-ui-results>
        </div>
    </div>
`;

const controller = (...args) => new CostimizerUiComponent(...args);
controller.$inject = ["$scope", "allegroListingCrawler", "allegroCostimizer"];

const component = {
    template,
    controller,
    controllerAs: "ctrl",
    bindings: {}
};

CostimizerUiComponent.component = component;

export default CostimizerUiComponent;
export {CostimizerUiComponent};
