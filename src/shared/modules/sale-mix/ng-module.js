import angular from 'angular';
import 'shared/allegro/ng-module';
import 'shared/ceneo/ng-module';

import SaleMix from './sale-mix';

angular
    .module('saleMix', ['allegro', 'ceneo'])
    .service('saleMix', SaleMix.service);
