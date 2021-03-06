import _ from 'lodash';

class CostimizerUiQueriesComponent {
    constructor($scope, i18n) {
        this.lang = i18n.getLang('costimizerUiQueries');

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
        let queries = _.clone(this.queries);
        this.onSubmit({queries});
    }
}

const template = `
    <section class="search-query" ng-repeat="query in ctrl.queries track by $index">
        <section class="buttonset search-query-buttonset search-query-section">
            <input type="text" class="input-text search-query-input search-query-update-input"
                ng-model="ctrl.model.queries[$index].phrase" placeholder="{{ctrl.lang.querySetPlaceholder}}"
                on-enter="ctrl.submitQuery($index)" />
            <button class="icon-button" ng-click="ctrl.updateQuery($index)" ng-if="!ctrl.isPristineQuery($index)">
                <span>&#128270;</span>
            </button>
            <button class="icon-button search-query-remove-button" ng-click="ctrl.removeQuery($index)" ng-if="ctrl.isPristineQuery($index)">
                <span>&#10060;</span>
            </button>
        </section>
    </section>
    <section class="search-query-form" ng-if="!ctrl.queries.length">
        <section class="buttonset search-query-buttonset search-query-section">
            <input type="text" class="input-text search-query-input search-query-add-input"
                ng-model="ctrl.model.newQuery.phrase" placeholder="{{ctrl.lang.queryPlaceholder}}"
                on-enter="ctrl.addQuery()" autofocus />
            <button class="icon-button" ng-click="ctrl.addQuery()">
                <span>&#128270;</span>
            </button>
        </section>
    </section>
    <section class="search-query-form" ng-if="ctrl.queries.length">
        <section class="buttonset search-query-buttonset search-query-section">
            <input type="text" class="input-text search-query-input search-query-add-input"
                ng-model="ctrl.model.newQuery.phrase" placeholder="{{ctrl.lang.queryAddPlaceholder}}"
                on-enter="ctrl.addQuery()" autofocus />
            <button class="icon-button" ng-click="ctrl.addQuery()">
                <span>&#128270;</span>
            </button>
        </section>
    </section>
    <section class="search-add">
        <section class="search-query-section">
            <button class="icon-button" ng-click="ctrl.addQuery()">
                <span>&#10133; {{ctrl.lang.searchAddLabel}}</span>
            </button>
        </section>
    </section>
`;

const controller = (...args) => new CostimizerUiQueriesComponent(...args);
controller.$inject = ['$scope', 'i18n'];

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
