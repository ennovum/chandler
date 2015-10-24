import _ from "lodash";

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

        this.queries = null;
        this.results = null;
    }

    submitQueries() {
        this.queries = _.clone(this.model.queries);
        this.results = null;

        let searchResults = _.map(this.queries, (query) => ({
            "meta": {query},
            "data": []
        }));

        Promise.all(
            _.map(this.queries, (query, index) => this._client.sipSearch(query, (result) => {
                searchResults[index].data = searchResults[index].data.concat(result.data);

                return this._costimizer.costimizeSearchResults(searchResults)
                    .then((costimizeResult) => {
                        this.results = costimizeResult.data;
                        this._$scope.$apply(); // async promise
                    });
            })))
            .then(() => {
                // nothing
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
