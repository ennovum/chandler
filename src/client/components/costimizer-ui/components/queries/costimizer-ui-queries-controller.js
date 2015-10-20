class CostimizerUiQueriesController {
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

CostimizerUiQueriesController.controller = (...args) => new CostimizerUiQueriesController(...args);
CostimizerUiQueriesController.controller.$inject = [];

export default CostimizerUiQueriesController;
export {CostimizerUiQueriesController};
