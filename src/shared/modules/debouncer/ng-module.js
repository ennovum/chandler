import angular from 'angular';

import Debouncer from './debouncer';

angular
    .module('debouncer', [])
    .service('debouncer', Debouncer.factory);
