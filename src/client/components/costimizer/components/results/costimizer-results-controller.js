export default class CostimizerResultsController {
    constructor() {
        this.results; // via attribute
    }
}

CostimizerResultsController.controller = () => new CostimizerResultsController();
CostimizerResultsController.controller.$inject = [];
