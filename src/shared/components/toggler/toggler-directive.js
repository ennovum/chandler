class TogglerDirective {
    constructor() {
        this.restrict = "A";
        this.controller = "toggler";
    }
}

TogglerDirective.directive = () => new TogglerDirective();
TogglerDirective.directive.$inject = [];

export default TogglerDirective;
export {TogglerDirective};
