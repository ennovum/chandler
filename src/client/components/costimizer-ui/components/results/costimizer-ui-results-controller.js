class CostimizerUiResultsController {
    constructor() {
        this.results; // via attribute
    }
}

CostimizerUiResultsController.controller = (...args) => new CostimizerUiResultsController(...args);
CostimizerUiResultsController.controller.$inject = [];

export default CostimizerUiResultsController;
export {CostimizerUiResultsController};
