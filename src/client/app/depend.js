import angular from 'angular';

import {
    config
} from './../config/config.js';

import {
    AllegroListingCrawler,
    AllegroSellerCrawler,
    AllegroLinker,
    AllegroSale
} from './../../shared/components/allegro/allegro.js';

import {
    CeneoListingCrawler,
    CeneoLinker,
    CeneoSale
} from './../../shared/components/ceneo/ceneo.js';

import {
    SaleMix
} from './../../shared/components/sale/sale.js';

import {
    Costimizer
} from './../../shared/components/costimizer/costimizer.js';

import {
    CostimizerUiComponent,
    CostimizerUiIntroComponent,
    CostimizerUiQueriesComponent,
    CostimizerUiResultsComponent,
} from './../components/costimizer-ui/costimizer-ui.js';

import {
    LoadingComponent
} from './../../shared/components/loading/loading.js';

import {
    Fetcher
} from './../../shared/components/fetcher/fetcher.js';

import {
    Stock
} from './../../shared/components/stock/stock.js';

import {
    Crawebler
} from './../../shared/components/crawebler/crawebler.js';

import {
    OnEnterDirective,
    OnEscDirective
} from './../../shared/components/keyboard/keyboard.js';

import {
    PriceComponent
} from './../../shared/components/price/price.js';

import {
    Debouncer
} from './../../shared/components/debouncer/debouncer.js';

import {
    AutofocusDirective
} from './../../shared/components/input/input.js';

function depend() {
    angular
        .module('config', [])
        .service('config', () => config);

    angular
        .module('allegro', ['config', 'fetcher', 'crawebler', 'stock', 'costimizer'])
        .service('allegroListingCrawler', AllegroListingCrawler.service)
        .service('allegroSellerCrawler', AllegroSellerCrawler.service)
        .service('allegroLinker', AllegroLinker.service)
        .service('allegroSale', AllegroSale.service);

    angular
        .module('ceneo', ['config', 'fetcher', 'crawebler', 'stock', 'costimizer'])
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
