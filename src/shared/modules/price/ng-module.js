import angular from 'angular';

import PriceComponent from './price-component';

angular
    .module('price', [])
    .component('price', PriceComponent.component);
