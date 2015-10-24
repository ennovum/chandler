import template from "./costimizer-ui-results.html";

class CostimizerUiResultsDirective {
    constructor() {
        this.restrict = "E";
        this.template = template;
        this.scope = {
            queries: "=",
            results: "="
        };
        this.controller = "costimizerUiResults";
        this.controllerAs = "ctrl";
        this.bindToController = true;
    }
}

CostimizerUiResultsDirective.directive = (...args) => new CostimizerUiResultsDirective(...args);
CostimizerUiResultsDirective.directive.$inject = [];

export default CostimizerUiResultsDirective;
export {CostimizerUiResultsDirective};
