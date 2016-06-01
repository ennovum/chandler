import _ from "lodash";

const RESULTS_DEBOUNCE_SPAN = 5000;

class CostimizerUiComponent {
    constructor($scope, allegroSale, debouncer) {
        this._$scope = $scope;
        this._allegroSale = allegroSale;
        this._debouncer = debouncer;

        this.on = {
            submitQueries: (queries) => this.submitQueries(queries),
            abortQueries: () => this.abortQueries()
        };

        this.queries = null;
        this.results = null;

        this.sipSalePromise = null;
    }

    submitQueries(queries) {
        this.queries = queries;
        this.results = null;

        this.abortQueries();

        let resultsDebounce = this._debouncer.create({span: RESULTS_DEBOUNCE_SPAN});

        let sipSalePromise = this.sipSalePromise = this._allegroSale.sipSale(queries, (results) => {
            this._applyResults(results, resultsDebounce);
        });

        sipSalePromise
            .then(() => {
                if (!sipSalePromise.isAborted) {
                    resultsDebounce.flush();
                }
                this._debouncer.destroy(resultsDebounce);
            })
            .catch((err) => {
                console.error(err); // TODO
            });
    }

    _applyResults(results, resultsDebounce) {
        resultsDebounce.queue(() => {
            this.results = results;
            this._$scope.$apply(); // async debounce
        });
    }

    abortQueries() {
        if (!this.sipSalePromise) {
            return;
        }

        this.sipSalePromise.abort();
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
            <loading promise="ctrl.sipSalePromise" is-abortable="true" on-abort="ctrl.on.abortQueries()"></loading>
            <costimizer-ui-results queries="ctrl.queries" results="ctrl.results"></costimizer-ui-results>
        </div>
    </div>
`;

const controller = (...args) => new CostimizerUiComponent(...args);
controller.$inject = ["$scope", "allegroSale", "debouncer"];

const component = {
    template,
    controller,
    controllerAs: "ctrl",
    bindings: {}
};

CostimizerUiComponent.component = component;

export default CostimizerUiComponent;
export {CostimizerUiComponent};
