import template from "./loading.html";

class LoadingDirective {
    constructor() {
        this.restrict = "E";
        this.template = template;
        this.scope = {
            promise: "=",
            isAbortable: "=",
            onAbort: "&"
        };
        this.controller = "loading";
        this.controllerAs = "ctrl";
        this.bindToController = true;
    }
}

LoadingDirective.directive = (...args) => new LoadingDirective(...args);
LoadingDirective.directive.$inject = [];

export default LoadingDirective;
export {LoadingDirective};
