class TogglerDirective {
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

const controller = (...args) => new TogglerDirective(...args);
controller.$inject = ['$scope', '$element', '$attrs'];

const directive = () => ({
    restrict: 'A',
    controller
});

TogglerDirective.directive = directive;

export default TogglerDirective;
export {TogglerDirective};
