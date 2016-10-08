import TogglerDirective from './toggler-directive';

angular
    .module('toggler', [])
    .directive('toggler', TogglerDirective.directive);
