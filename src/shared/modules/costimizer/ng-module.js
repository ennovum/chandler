import angular from 'angular';

import Costimizer from './costimizer';

angular
    .module('costimizer', [])
    .service('costimizer', Costimizer.factory);
