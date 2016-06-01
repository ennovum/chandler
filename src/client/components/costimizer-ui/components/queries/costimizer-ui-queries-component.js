import _ from "lodash";

class CostimizerUiQueriesComponent {
    constructor($scope, $element) {
        this._el = $element[0];

        this.sourceQueries; // via bindings
        this.onSubmit; // via bindings

        this.queries = [];
        this.model = {
            queries: [],
            newQuery: ""
        };

        $scope.$watch(() => this.sourceQueries, () => this._applyQueries());
    }

    _applyQueries() {
        _.forEach(this.sourceQueries, (query) => {
            if (this.model.queries.indexOf(query) === -1) {
                this.queries.push(query);
                this.model.queries.push(query);
            }
        });
    }

    addQuery() {
        this.queries.push(this.model.newQuery);
        this.model.queries.push(this.model.newQuery);
        this.model.newQuery = "";

        this._submitQueries();
    }

    removeQuery(index) {
        this.queries.splice(index, 1);
        this.model.queries.splice(index, 1);

        this._submitQueries();
    }

    updateQuery(index) {
        this.queries[index] = this.model.queries[index];

        this._submitQueries();
    }

    submitQuery(index) {
        if (this.isValidQuery(index)) {
            this.updateQuery(index);
        }
        else {
            this.removeQuery(index);
        }
    }

    isValidQuery(index) {
        return _.trim(this.model.queries[index]) !== "";
    }

    isValidNewQuery() {
        return _.trim(this.model.newQuery) !== "";
    }

    isPristineQuery(index) {
        return this.model.queries[index] === this.queries[index];
    }

    _submitQueries() {
        let queries = _.filter(this.queries, (query) => !!_.trim(query));
        this.onSubmit({queries});
    }
}

const template = `
    <section class="search-queries">
        <section ng-repeat="query in ctrl.queries track by $index">
            <div class="buttonset search-query-form">
                <input class="input-text search-query-input search-query-update-input" type="text" ng-model="ctrl.model.queries[$index]" placeholder="Set the query" on-enter="ctrl.submitQuery($index)" />
                <button class="icon-button" ng-click="ctrl.updateQuery($index)" ng-if="ctrl.isValidQuery($index) && !ctrl.isPristineQuery($index)">
                    <span>&#128270; Set search</span>
                </button>
                <button class="icon-button search-query-remove-button" ng-click="ctrl.removeQuery($index)" ng-if="!(ctrl.isValidQuery($index))">&#10060;</button>
                <button class="icon-button blind-button search-query-ok-button" ng-if="ctrl.isValidQuery($index) && ctrl.isPristineQuery($index)">&#128270;</button>
            </div>
        </section>
        <section>
            <div class="buttonset search-query" ng-if="!ctrl.queries.length">
                <input class="input-text search-query-input search-query-add-input" type="text" ng-model="ctrl.model.newQuery" placeholder="Enter a query" on-enter="ctrl.addQuery()" autofocus />
                <button class="icon-button" ng-click="ctrl.addQuery()">
                    <span>&#128270; Search</span>
                </button>
            </div>
            <div class="buttonset search-query" ng-if="ctrl.queries.length">
                <input class="input-text search-query-input search-query-add-input" type="text" ng-model="ctrl.model.newQuery" placeholder="Enter another query" on-enter="ctrl.addQuery()" autofocus />
                <button class="icon-button" ng-click="ctrl.addQuery()">
                    <span>&#128270; Add search</span>
                </button>
            </div>
        </section>
        <section>
            <div class="buttonset search-add">
                <button class="icon-button" ng-click="ctrl.addQuery()">
                    <span>&#10133; Add another search</span>
                </button>
            </div>
        </section>
    </section>
`;

const controller = (...args) => new CostimizerUiQueriesComponent(...args);
controller.$inject = ["$scope", "$element"];

const component = {
    template,
    controller,
    controllerAs: "ctrl",
    bindings: {
        sourceQueries: "<queries",
        onSubmit: "&"
    }
};

CostimizerUiQueriesComponent.component = component;

export default CostimizerUiQueriesComponent;
export {CostimizerUiQueriesComponent};
