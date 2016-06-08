class AutofocusDirective {
    constructor($scope, $element, $attrs) {
        $element[0].focus();
    }
}

const controller = (...args) => new AutofocusDirective(...args);
controller.$inject = ['$scope', '$element', '$attrs'];

const directive = () => ({
    restrict: 'A',
    controller
});

AutofocusDirective.directive = directive;

export default AutofocusDirective;
export {AutofocusDirective};
