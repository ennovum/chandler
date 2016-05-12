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
            submitQueries: () => this.submitQueries(),
            abortQueries: () => this.abortQueries()
        };

        this.queries = null;
        this.results = null;

        this.sipPromises = null;
        this.sipAllPromise = null;
    }

    submitQueries() {
        this.queries = _.clone(this.model.queries);
        this.results = null;

        let searchSets = _.map(this.queries, (query) => ({
            "query": query,
            "items": []
        }));

        this.sipPromises = _.map(searchSets, (searchSet) => this._client.sipSearch(searchSet.query, (result) => {
            searchSet.items = searchSet.items.concat(result.data);

            return this._costimizer.costimizeSearch(searchSets)
                .then((results) => {
                    this.results = results;
                    this._$scope.$apply(); // async promise
                });
        }));

        this.sipAllPromise = Promise.all(this.sipPromises)
            .then(() => {
                // nothing
            })
            .catch(() => {
                // TODO
            });
    }

    abortQueries() {
        _.forEach(this.sipPromises, (sipPromise) => {
            sipPromise.abort();
        });

        this.sipPromises = null;
    }
}

CostimizerUiController.controller = (...args) => new CostimizerUiController(...args);
CostimizerUiController.controller.$inject = ["$scope", "allegroClient", "allegroCostimizer"];

export default CostimizerUiController;
export {CostimizerUiController};
