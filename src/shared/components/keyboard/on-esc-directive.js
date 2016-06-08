const KEYCODE_ESC = 27;

class OnEscDirective {
    constructor($scope, $element, $attrs, $parse) {
        let onEscParsing = $parse($attrs.onEsc);

        $element[0].addEventListener('keyup', (event) => { // no keypress for ESC key
            if (event.defaultPrevented) {
                return;
            }

            if (event.keyCode === KEYCODE_ESC) {
                onEscParsing($scope);
                $scope.$apply();

                event.preventDefault();
            }
        });
    }
}

const controller = (...args) => new OnEscDirective(...args);
controller.$inject = ['$scope', '$element', '$attrs', '$parse'];

const directive = () => ({
    restrict: 'A',
    controller
});

OnEscDirective.directive = directive;

export default OnEscDirective;
export {OnEscDirective};
