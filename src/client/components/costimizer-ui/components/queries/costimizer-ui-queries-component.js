import _ from 'lodash';

class CostimizerUiQueriesComponent {
    constructor($scope, $element) {
        this._el = $element[0];

        this.sourceQueries; // via bindings
        this.onSubmit; // via bindings

        this.queries = [];
        this.model = {
            queries: [],
            newQuery: null
        };

        this._resetNewQuery();

        $scope.$watch(() => this.sourceQueries, () => this._applyQueries());
    }

    _resetNewQuery() {
        this.model.newQuery = {phrase: ''};
    }

    _applyQueries() {
        _.forEach(this.sourceQueries, (sourceQuery) => {
            if (!_.find(this.model.queries, (modelQuery) => modelQuery.phrase === sourceQuery.phrase)) {
                let phrase = sourceQuery.phrase;

                this.queries.push({phrase});
                this.model.queries.push({phrase});
            }
        });
    }

    addQuery() {
        let phrase = this.model.newQuery.phrase;

        this.queries.push({phrase});
        this.model.queries.push({phrase});

        this._resetNewQuery();
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
        let modelQuery = this.model.queries[index];
        return _.trim(modelQuery.phrase) !== '';
    }

    isValidNewQuery() {
        let modelNewQuery = this.model.newQuery;
        return _.trim(modelNewQuery.phrase) !== '';
    }

    isPristineQuery(index) {
        return this.model.queries[index].phrase === this.queries[index].phrase;
    }

    _submitQueries() {
        let queries = _.filter(this.queries, (query) => !!_.trim(query.phrase));
        this.onSubmit({queries});
    }
}

const template = `
    <section class="search-queries">
        <section ng-repeat="query in ctrl.queries track by $index">
            <div class="buttonset search-query-form">
                <input class="input-text search-query-input search-query-update-input" type="text" ng-model="ctrl.model.queries[$index].phrase" placeholder="Set the query" on-enter="ctrl.submitQuery($index)" />
                <button class="icon-button" ng-click="ctrl.updateQuery($index)" ng-if="ctrl.isValidQuery($index) && !ctrl.isPristineQuery($index)">
                    <span>&#128270; Set search</span>
                </button>
                <button class="icon-button search-query-remove-button" ng-click="ctrl.removeQuery($index)" ng-if="!(ctrl.isValidQuery($index))">&#10060;</button>
                <button class="icon-button blind-button search-query-ok-button" ng-if="ctrl.isValidQuery($index) && ctrl.isPristineQuery($index)">&#128270;</button>
            </div>
        </section>
        <section>
            <div class="buttonset search-query" ng-if="!ctrl.queries.length">
                <input class="input-text search-query-input search-query-add-input" type="text" ng-model="ctrl.model.newQuery.phrase" placeholder="Enter a query" on-enter="ctrl.addQuery()" autofocus />
                <button class="icon-button" ng-click="ctrl.addQuery()">
                    <span>&#128270; Search</span>
                </button>
            </div>
            <div class="buttonset search-query" ng-if="ctrl.queries.length">
                <input class="input-text search-query-input search-query-add-input" type="text" ng-model="ctrl.model.newQuery.phrase" placeholder="Enter another query" on-enter="ctrl.addQuery()" autofocus />
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
controller.$inject = ['$scope', '$element'];

const component = {
    template,
    controller,
    controllerAs: 'ctrl',
    bindings: {
        sourceQueries: '<queries',
        onSubmit: '&'
    }
};

CostimizerUiQueriesComponent.component = component;

export default CostimizerUiQueriesComponent;
export {CostimizerUiQueriesComponent};
