import template from "./costimizer.html";

class CostimizerDirective {
    constructor() {
        this.restrict = "E";
        this.template = template;
        this.scope = {};
        this.controller = "costimizer";
        this.controllerAs = "ctrl";
        this.bindToController = true;
    }
}

CostimizerDirective.directive = () => new CostimizerDirective();
CostimizerDirective.directive.$inject = [];

export default CostimizerDirective;
