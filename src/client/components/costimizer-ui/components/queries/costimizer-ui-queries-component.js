import _ from "lodash";

class CostimizerUiQueriesComponent {
    constructor($element) {
        this._el = $element[0];

        this.queries; // via bindings
        this.onSubmit; // via bindings

        this.model = {
            queries: _.clone(this.queries) || [],
            query: ""
        };
        this.editedIndex = null;
    }

    addQuery() {
        if (_.trim(this.model.query) === "") {
            return;
        }

        this.model.queries.push(this.model.query);
        this.model.query = "";

        this._submitQueries();
    }

    removeQuery(index) {
        this.model.queries.splice(index, 1);

        this._submitQueries();
    }

    updateQuery(index) {
        this.model.queries[index] = this.model.query;

        this.editedIndex = null;
        this.model.query = "";

        this._submitQueries();
    }

    editQuery(index) {
        this.editedIndex = index;
        this.model.query = this.model.queries[index];
    }

    cancelEditQuery() {
        this.editedIndex = null;
        this.model.query = "";
    }

    submitEditQuery() {
        this.updateQuery(this.editedIndex);
    }

    isEditedQuery(query) {
        return this.hasEditedQuery() && this.model.queries[this.editedIndex] === query;
    }

    hasEditedQuery() {
        return this.editedIndex !== null;
    }

    _submitQueries() {
        let queries = _.clone(this.model.queries);
        this.onSubmit({queries});
    }
}

const template = `
    <section class="search-queries">
        <section ng-repeat="query in ctrl.model.queries track by $index">
            <div class="buttonset search-query" ng-if="!ctrl.isEditedQuery(query)">
                <button class="blind-button search-query-update-button" ng-click="ctrl.editQuery($index)" ng-bind="query"></button>
                <button class="icon-button search-query-remove-button" ng-click="ctrl.removeQuery($index)">&#10060;</button>
            </div>
            <div class="buttonset search-query-form" ng-if="ctrl.isEditedQuery(query)">
                <input class="input-text search-query-input search-query-update-input" type="text" ng-model="ctrl.model.query" placeholder="Update the query" on-enter="ctrl.submitEditQuery()" on-esc="ctrl.cancelEditQuery()" autofocus />
                <button class="icon-button" ng-click="ctrl.submitEditQuery()">
                    <span>Save search</span>
                </button>
            </div>
        </section>
        <section ng-if="!ctrl.hasEditedQuery()">
            <div class="buttonset search-query-form" ng-if="!ctrl.model.queries.length">
                <input class="input-text search-query-input search-query-add-input" type="text" ng-model="ctrl.model.query" placeholder="Enter a query" on-enter="ctrl.addQuery()" autofocus />
                <button class="icon-button" ng-click="ctrl.addQuery()">
                    <span>Search</span>
                </button>
            </div>
            <div class="buttonset search-query-form" ng-if="ctrl.model.queries.length">
                <input class="input-text search-query-input search-query-add-input" type="text" ng-model="ctrl.model.query" placeholder="Enter another query" on-enter="ctrl.addQuery()" autofocus />
                <button class="icon-button" ng-click="ctrl.addQuery()">
                    <span>Add search</span>
                </button>
            </div>
        </section>
    </section>
`;

const controller = (...args) => new CostimizerUiQueriesComponent(...args);
controller.$inject = ["$element"];

const component = {
    template,
    controller,
    controllerAs: "ctrl",
    bindings: {
        queries: "=",
        onSubmit: "&"
    }
};

CostimizerUiQueriesComponent.component = component;

export default CostimizerUiQueriesComponent;
export {CostimizerUiQueriesComponent};
