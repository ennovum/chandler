import angular from 'angular';
import conf from 'conf';

import {
    AllegroListingCrawler,
    AllegroSellerCrawler,
    AllegroLinker,
    AllegroSale
} from './../../shared/modules/allegro/allegro.js';

import {
    CeneoListingCrawler,
    CeneoLinker,
    CeneoSale
} from './../../shared/modules/ceneo/ceneo.js';

import {
    SaleMix
} from './../../shared/modules/sale/sale.js';

import {
    Costimizer
} from './../../shared/modules/costimizer/costimizer.js';

import {
    CostimizerUiComponent,
    CostimizerUiIntroComponent,
    CostimizerUiQueriesComponent,
    CostimizerUiResultsComponent
} from './../modules/costimizer-ui/costimizer-ui.js';

import {
    LoadingComponent
} from './../../shared/modules/loading/loading.js';

import {
    Fetcher
} from './../../shared/modules/fetcher/fetcher.js';

import {
    Stock
} from './../../shared/modules/stock/stock.js';

import {
    Crawebler
} from './../../shared/modules/crawebler/crawebler.js';

import {
    OnEnterDirective,
    OnEscDirective
} from './../../shared/modules/keyboard/keyboard.js';

import {
    PriceComponent
} from './../../shared/modules/price/price.js';

import {
    Debouncer
} from './../../shared/modules/debouncer/debouncer.js';

import {
    AutofocusDirective
} from './../../shared/modules/input/input.js';

function depend() {
    angular
        .module('conf', [])
        .service('conf', () => conf);

    angular
        .module('allegro', ['conf', 'fetcher', 'crawebler', 'stock', 'costimizer'])
        .service('allegroListingCrawler', AllegroListingCrawler.service)
        .service('allegroSellerCrawler', AllegroSellerCrawler.service)
        .service('allegroLinker', AllegroLinker.service)
        .service('allegroSale', AllegroSale.service);

    angular
        .module('ceneo', ['conf', 'fetcher', 'crawebler', 'stock', 'costimizer'])
        .service('ceneoListingCrawler', CeneoListingCrawler.service)
        .service('ceneoLinker', CeneoLinker.service)
        .service('ceneoSale', CeneoSale.service);

    angular
        .module('sale', ['allegro', 'ceneo'])
        .service('saleMix', SaleMix.service);

    angular
        .module('costimizer', [])
        .service('costimizer', Costimizer.factory);

    angular
        .module('costimizerUi', ['sale', 'debouncer', 'loading', 'keyboard', 'price', 'input'])
        .component('costimizerUi', CostimizerUiComponent.component)
        .component('costimizerUiIntro', CostimizerUiIntroComponent.component)
        .component('costimizerUiQueries', CostimizerUiQueriesComponent.component)
        .component('costimizerUiResults', CostimizerUiResultsComponent.component);

    angular
        .module('loading', [])
        .component('loading', LoadingComponent.component);

    angular
        .module('fetcher', [])
        .service('fetcher', Fetcher.factory);

    angular
        .module('stock', [])
        .service('stock', Stock.factory);

    angular
        .module('crawebler', [])
        .service('crawebler', Crawebler.factory);

    angular
        .module('keyboard', [])
        .directive('onEnter', OnEnterDirective.directive)
        .directive('onEsc', OnEscDirective.directive);

    angular
        .module('price', [])
        .component('price', PriceComponent.component);

    angular
        .module('debouncer', [])
        .service('debouncer', Debouncer.factory);

    angular
        .module('input', [])
        .directive('autofocus', AutofocusDirective.directive);
}

export default depend;
export {depend};
