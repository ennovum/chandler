import angular from 'angular';

import Crawebler from './crawebler';

angular
    .module('crawebler', [])
    .service('crawebler', Crawebler.factory);
