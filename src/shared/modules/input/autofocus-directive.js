class AutofocusDirective {
    constructor($element) {
        $element[0].focus();
    }
}

const controller = (...args) => new AutofocusDirective(...args);
controller.$inject = ['$element'];

const directive = () => ({
    restrict: 'A',
    controller
});

AutofocusDirective.directive = directive;

export default AutofocusDirective;
export {AutofocusDirective};
