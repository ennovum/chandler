class TogglerController {
    constructor($scope, $element, $attrs) {
        this.name = $attrs.toggler;
        this.api = $scope[this.name] = $scope[this.name] || {};

        this.api.toggle = (option) => this.toggle(option);
        this.api.get = () => this.get();
        this.api.is = (option) => this.is(option);

        this.option = $attrs.togglerInit || null;
    }

    toggle(option) {
        return this.option = this.option === option ? null : option;
    }

    get() {
        return this.option;
    }

    is(option) {
        return this.option === option;
    }
}

TogglerController.controller = ($scope, $element, $attrs) => new TogglerController($scope, $element, $attrs);
TogglerController.controller.$inject = ["$scope", "$element", "$attrs"];

export default TogglerController;
export {TogglerController};
