class CostimizerUiController {
    constructor($scope, allegroClient, allegroCostimizer) {
        this._$scope = $scope;
        this._client = allegroClient;
        this._costimizer = allegroCostimizer;

        this.model = {
            queries: [""]
        };

        this.on = {
            submitQueries: () => this.submitQueries()
        };

        this.results = null;
    }

    submitQueries() {
        let queries = this.model.queries;

        Promise.all(_.map(queries, (query) => this._client.getSearch(query)))
            .then((searchResults) => this._costimizer.costimizeSearchResults(searchResults))
            .then((costimizeResult) => {
                this.results = costimizeResult.data;
                this._$scope.$apply(); // custom async promise
            })
            .catch(() => {
                // TODO
            });
    }
}

CostimizerUiController.controller = (...args) => new CostimizerUiController(...args);
CostimizerUiController.controller.$inject = ["$scope", "allegroClient", "allegroCostimizer"];

export default CostimizerUiController;
export {CostimizerUiController};
