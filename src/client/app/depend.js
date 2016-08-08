import angular from 'angular';
import conf from 'conf';

import {
    AllegroListingCrawler,
    AllegroSellerCrawler,
    AllegroLinker,
    AllegroSale
} from 'allegro/allegro.js';

import {
    CeneoListingCrawler,
    CeneoLinker,
    CeneoSale
} from 'ceneo/ceneo.js';

import {
    SaleMix
} from 'sale/sale.js';

import {
    Costimizer
} from 'costimizer/costimizer.js';

import {
    CostimizerUiComponent,
    CostimizerUiIntroComponent,
    CostimizerUiQueriesComponent,
    CostimizerUiResultsComponent
} from 'costimizer-ui/costimizer-ui.js';

import {
    LoadingComponent
} from 'loading/loading.js';

import {
    Fetcher
} from 'fetcher/fetcher.js';

import {
    Stock
} from 'stock/stock.js';

import {
    Crawebler
} from 'crawebler/crawebler.js';

import {
    OnEnterDirective,
    OnEscDirective
} from 'keyboard/keyboard.js';

import {
    PriceComponent
} from 'price/price.js';

import {
    Debouncer
} from 'debouncer/debouncer.js';

import {
    AutofocusDirective
} from 'input/input.js';

import {
    TrustFilter
} from 'trust/trust.js';

import {
    I18n
} from 'i18n/i18n.js';

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
        .module('costimizerUi', ['sale', 'debouncer', 'loading', 'keyboard', 'price', 'input', 'trust', 'i18n'])
        .component('costimizerUi', CostimizerUiComponent.component)
        .component('costimizerUiIntro', CostimizerUiIntroComponent.component)
        .component('costimizerUiQueries', CostimizerUiQueriesComponent.component)
        .component('costimizerUiResults', CostimizerUiResultsComponent.component);

    angular
        .module('loading', ['i18n'])
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

    angular
        .module('trust', [])
        .filter('trust', TrustFilter.filter);

    angular
        .module('i18n', [])
        .service('i18n', I18n.service);
}

export default depend;
export {depend};
