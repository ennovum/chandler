const KEYCODE_ENTER = 13;

class OnEnterDirective {
    constructor($scope, $element, $attrs, $parse) {
        let onEnterParsing = $parse($attrs.onEnter);

        $element[0].addEventListener('keypress', (event) => {
            if (event.defaultPrevented) {
                return;
            }

            if (event.keyCode === KEYCODE_ENTER) {
                onEnterParsing($scope);
                $scope.$apply();

                event.preventDefault();
            }
        });
    }
}

const controller = (...args) => new OnEnterDirective(...args);
controller.$inject = ['$scope', '$element', '$attrs', '$parse'];

const directive = () => ({
    restrict: 'A',
    controller
});

OnEnterDirective.directive = directive;

export default OnEnterDirective;
export {OnEnterDirective};
