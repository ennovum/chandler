import template from "./costimizer-ui.html";

class CostimizerUiDirective {
    constructor() {
        this.restrict = "E";
        this.template = template;
        this.scope = {};
        this.controller = "costimizerUi";
        this.controllerAs = "ctrl";
        this.bindToController = true;
    }
}

CostimizerUiDirective.directive = (...args) => new CostimizerUiDirective(...args);
CostimizerUiDirective.directive.$inject = [];

export default CostimizerUiDirective;
export {CostimizerUiDirective};
