import angular from 'angular';
import conf from 'conf';

import {
    AllegroCategoryCrawler,
    AllegroListingCrawler,
    AllegroSellerCrawler,
    AllegroLinker,
    AllegroSale
} from 'shared/allegro/allegro';

import {
    CeneoCategoryCrawler,
    CeneoListingCrawler,
    CeneoLinker,
    CeneoSale
} from 'shared/ceneo/ceneo';

import {
    SaleMix
} from 'shared/sale/sale';

import {
    Costimizer
} from 'shared/costimizer/costimizer';

import {
    CostimizerUiComponent,
    CostimizerUiIntroComponent,
    CostimizerUiQueriesComponent,
    CostimizerUiResultsComponent
} from 'webui/costimizer-ui/costimizer-ui';

import {
    LoadingComponent
} from 'shared/loading/loading';

import {
    Fetcher
} from 'shared/fetcher/fetcher';

import {
    Stock
} from 'shared/stock/stock';

import {
    Crawebler
} from 'shared/crawebler/crawebler';

import {
    OnEnterDirective,
    OnEscDirective
} from 'shared/keyboard/keyboard';

import {
    PriceComponent
} from 'shared/price/price';

import {
    Debouncer
} from 'shared/debouncer/debouncer';

import {
    AutofocusDirective
} from 'shared/input/input';

import {
    TrustFilter
} from 'shared/trust/trust';

import {
    I18n
} from 'shared/i18n/i18n';

function depend() {
    angular
        .module('conf', [])
        .service('conf', () => conf);

    angular
        .module('allegro', ['conf', 'fetcher', 'crawebler', 'stock', 'costimizer'])
        .service('allegroCategoryCrawler', AllegroCategoryCrawler.service)
        .service('allegroListingCrawler', AllegroListingCrawler.service)
        .service('allegroSellerCrawler', AllegroSellerCrawler.service)
        .service('allegroLinker', AllegroLinker.service)
        .service('allegroSale', AllegroSale.service);

    angular
        .module('ceneo', ['conf', 'fetcher', 'crawebler', 'stock', 'costimizer'])
        .service('ceneoCategoryCrawler', CeneoCategoryCrawler.service)
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
