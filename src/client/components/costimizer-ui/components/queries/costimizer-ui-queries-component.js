class CostimizerUiQueriesComponent {
    constructor() {
        this.model; // via bindings
        this.onSubmit; // via bindings
    }

    addQuery() {
        this.model.queries.push("");
    }

    removeQuery(index) {
        this.model.queries.splice(index, 1);
    }

    submitQueries() {
        this.onSubmit();
    }
}

const template = `
    <div class="search-queries" ng-show="ctrl.model.queries.length">
        <div class="search-query" ng-repeat="query in ctrl.model.queries track by $index">
            <input class="search-input" type="text" ng-model="ctrl.model.queries[$index]" placeholder="Enter a query" />
            <button class="secondary-button search-button" ng-click="ctrl.removeQuery($index)">Remove the query</button>
        </div>
    </div>
    <div class="search-buttons">
        <button class="secondary-button search-button" ng-click="ctrl.addQuery()">Add a query</button>
    </div>
    <div class="search-buttons">
        <button class="search-button" ng-click="ctrl.submitQueries()" ng-show="ctrl.model.queries.length">Search</button>
    </div>
`;

const controller = (...args) => new CostimizerUiQueriesComponent(...args);
controller.$inject = [];

const component = {
    template,
    controller,
    controllerAs: "ctrl",
    bindings: {
        model: "=",
        onSubmit: "&"
    }
};

CostimizerUiQueriesComponent.component = component;

export default CostimizerUiQueriesComponent;
export {CostimizerUiQueriesComponent};
