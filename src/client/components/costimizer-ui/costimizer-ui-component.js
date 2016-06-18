import _ from 'lodash';

const RESULTS_DEBOUNCE_SPAN = 5000;
const VENDOR_ID_ALLEGRO = 'allegro';
const VENDOR_ID_CENEO = 'ceneo';

class CostimizerUiComponent {
    constructor($scope, saleMix, debouncer) {
        this._$scope = $scope;
        this._saleMix = saleMix;
        this._debouncer = debouncer;

        this.on = {
            submitQueries: (queries) => this.submitQueries(queries),
            abortQueries: () => this.abortQueries()
        };

        this.queries = null;
        this.results = null;
        this.progress = null;

        this.sipSalePromise = null;
    }

    submitQueries(queries) {
        this.queries = queries;
        this.results = null;
        this.progress = 0;

        this.abortQueries();

        let resultsDebounce = this._debouncer.create({span: RESULTS_DEBOUNCE_SPAN});
        let vendorIds = [VENDOR_ID_ALLEGRO, VENDOR_ID_CENEO];

        let sipSalePromise = this.sipSalePromise = this._saleMix.sipSaleMix(vendorIds, queries, (saleMix) => {
            this._applyResults(saleMix.results, resultsDebounce);
            this.progress = saleMix.progress;
            this._$scope.$apply(); // async promise
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
    <div class="main" ng-if="!ctrl.queries">
        <div class="logo">
            <h3>Chandler <span class="beta">beta</span></h3>
        </div>
        <costimizer-ui-intro on-submit="ctrl.on.submitQueries(queries)"></costimizer-ui-intro>
    </div>
    <div class="sidebar" ng-if="ctrl.queries">
        <div class="logo">
            <h3>Chandler <span class="beta">beta</span></h3>
        </div>
        <costimizer-ui-queries queries="ctrl.queries" on-submit="ctrl.on.submitQueries(queries)"></costimizer-ui-queries>
    </div>
    <div class="main" ng-if="ctrl.queries">
        <loading promise="ctrl.sipSalePromise" progress="ctrl.progress" is-abortable="true" on-abort="ctrl.on.abortQueries()"></loading>
        <costimizer-ui-results queries="ctrl.queries" results="ctrl.results"></costimizer-ui-results>
    </div>
`;

const controller = (...args) => new CostimizerUiComponent(...args);
controller.$inject = ['$scope', 'saleMix', 'debouncer'];

const component = {
    template,
    controller,
    controllerAs: 'ctrl',
    bindings: {}
};

CostimizerUiComponent.component = component;

export default CostimizerUiComponent;
export {CostimizerUiComponent};
