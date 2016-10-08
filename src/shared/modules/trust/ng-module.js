import angular from 'angular';

import TrustFilter from './trust-filter';

angular
    .module('trust', [])
    .filter('trust', TrustFilter.filter);
