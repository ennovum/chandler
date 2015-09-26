import template from "./costimizer-queries.html";

export default class CostimizerQueriesDirective {
    constructor() {
        this.restrict = "E";
        this.template = template;
        this.scope = {
            model: "=",
            onSubmit: "&"
        };
        this.controller = "costimizerQueries";
        this.controllerAs = "ctrl";
        this.bindToController = true;
    }
}

CostimizerQueriesDirective.directive = () => new CostimizerQueriesDirective();
CostimizerQueriesDirective.directive.$inject = [];
