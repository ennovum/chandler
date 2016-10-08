import angular from 'angular';
import 'shared/allegro/ng-module';
import 'shared/ceneo/ng-module';

import VendorSale from './vendor-sale';
import SaleMix from './sale-mix';

angular
    .module('sale', ['allegro', 'ceneo'])
    .service('saleMix', SaleMix.service);
