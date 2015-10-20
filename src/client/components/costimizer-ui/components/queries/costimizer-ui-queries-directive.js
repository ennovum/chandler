import template from "./costimizer-ui-queries.html";

class CostimizerUiQueriesDirective {
    constructor() {
        this.restrict = "E";
        this.template = template;
        this.scope = {
            model: "=",
            onSubmit: "&"
        };
        this.controller = "costimizerUiQueries";
        this.controllerAs = "ctrl";
        this.bindToController = true;
    }
}

CostimizerUiQueriesDirective.directive = (...args) => new CostimizerUiQueriesDirective(...args);
CostimizerUiQueriesDirective.directive.$inject = [];

export default CostimizerUiQueriesDirective;
export {CostimizerUiQueriesDirective};
