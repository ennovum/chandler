import angular from 'angular';

import AutofocusDirective from './autofocus-directive';

angular
    .module('input', [])
    .directive('autofocus', AutofocusDirective.directive);
