import angular from 'angular';

import OnEnterDirective from './on-enter-directive';
import OnEscDirective from './on-esc-directive';

angular
    .module('keyboard', [])
    .directive('onEnter', OnEnterDirective.directive)
    .directive('onEsc', OnEscDirective.directive);
