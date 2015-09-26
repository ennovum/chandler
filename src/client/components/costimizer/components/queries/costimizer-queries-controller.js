export default class CostimizerQueriesController {
    constructor() {
        this.model; // via attribute
        this.onSubmit; // via attribute
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

CostimizerQueriesController.controller = () => new CostimizerQueriesController();
CostimizerQueriesController.controller.$inject = [];
