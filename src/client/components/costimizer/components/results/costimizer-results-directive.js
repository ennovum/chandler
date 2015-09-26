import template from "./costimizer-results.html";

export default class CostimizerResultsDirective {
    constructor() {
        this.restrict = "E";
        this.template = template;
        this.scope = {
            results: "="
        };
        this.controller = "costimizerResults";
        this.controllerAs = "ctrl";
        this.bindToController = true;
    }
}

CostimizerResultsDirective.directive = () => new CostimizerResultsDirective();
CostimizerResultsDirective.directive.$inject = [];
