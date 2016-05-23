import _ from "lodash";

class CostimizerUiQueriesComponent {
    constructor($element) {
        this._el = $element[0];

        this._queryInputEl = this._el.querySelector(".search-query-input");

        this.queries; // via bindings
        this.onSubmit; // via bindings

        this.model = {
            queries: _.clone(this.queries) || [],
            newQuery: ""
        };

        this._queryInputEl.focus();
    }

    submitQuery() {
        if (this.model.newQuery !== "") {
            this.addQuery();
        }
    }

    addQuery() {
        this.model.queries.push(this.model.newQuery);
        this.model.newQuery = "";

        this.submitQueries();
        this._queryInputEl.focus();
    }

    removeQuery(index) {
        this.model.queries.splice(index, 1);

        this.submitQueries();
        this._queryInputEl.focus();
    }

    submitQueries() {
        let queries = _.clone(this.model.queries);
        this.onSubmit({queries});
    }
}

const template = `
    <section class="search-queries">
        <section class="" ng-if="ctrl.model.queries.length">
            <div class="buttonset search-query" ng-repeat="query in ctrl.model.queries track by $index">
                <button class="blind-button" ng-bind="query"></button>
                <button class="icon-button" ng-click="ctrl.removeQuery($index)">&#10060;</button>
            </div>
        </section>
        <section class="buttonset search-query-form">
            <input class="input-text search-query-input" type="text" ng-model="ctrl.model.newQuery" placeholder="Enter a query" on-enter="ctrl.submitQuery()" />
            <button class="icon-button" ng-click="ctrl.submitQuery()">Search</button>
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
