import angular from 'angular';

import Stock from './stock';

angular
    .module('stock', [])
    .service('stock', Stock.factory);
