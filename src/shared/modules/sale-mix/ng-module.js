import angular from 'angular';

import SaleMix from './sale-mix';

angular
    .module('saleMix', [])
    .service('saleMix', SaleMix.service);
