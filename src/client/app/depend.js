import angular from "angular";

import {
    config
} from "./../config/config.js";

import {
    AllegroListingCrawler,
    AllegroSellerCrawler
} from "./../../shared/components/allegro-crawler/allegro-crawler.js";

import {
    AllegroSale
} from "./../../shared/components/allegro-sale/allegro-sale.js";

import {
    Costimizer
} from "./../../shared/components/costimizer/costimizer.js";

import {
    CostimizerUiComponent,
    CostimizerUiQueriesComponent,
    CostimizerUiResultsComponent,
} from "./../components/costimizer-ui/costimizer-ui.js";

import {
    LoadingComponent
} from "./../../shared/components/loading/loading.js";

import {
    Fetcher
} from "./../../shared/components/fetcher/fetcher.js";

import {
    Stock
} from "./../../shared/components/stock/stock.js";

import {
    Crawebler
} from "./../../shared/components/crawebler/crawebler.js";

import {
    OnEnterDirective
} from "./../../shared/components/keyboard/keyboard.js";

import {
    PriceComponent
} from "./../../shared/components/price/price.js";

import {
    Debouncer
} from "./../../shared/components/debouncer/debouncer.js";

import {
    AutofocusDirective
} from "./../../shared/components/input/input.js";

function depend() {
    angular
        .module("config", [])
        .service("config", () => config);

    angular
        .module("allegroCrawler", ["config", "fetcher", "crawebler", "stock"])
        .service("allegroListingCrawler", AllegroListingCrawler.service)
        .service("allegroSellerCrawler", AllegroSellerCrawler.service);

    angular
        .module("allegroSale", ["allegroCrawler", "costimizer"])
        .service("allegroSale", AllegroSale.service);

    angular
        .module("costimizer", [])
        .service("costimizer", Costimizer.factory);

    angular
        .module("costimizerUi", ["allegroSale", "debouncer", "loading", "keyboard", "price"])
        .component("costimizerUi", CostimizerUiComponent.component)
        .component("costimizerUiQueries", CostimizerUiQueriesComponent.component)
        .component("costimizerUiResults", CostimizerUiResultsComponent.component);

    angular
        .module("loading", [])
        .component("loading", LoadingComponent.component);

    angular
        .module("fetcher", [])
        .service("fetcher", Fetcher.factory);

    angular
        .module("stock", [])
        .service("stock", Stock.factory);

    angular
        .module("crawebler", [])
        .service("crawebler", Crawebler.factory);

    angular
        .module("keyboard", [])
        .directive("onEnter", OnEnterDirective.directive);

    angular
        .module("price", [])
        .component("price", PriceComponent.component);

    angular
        .module("debouncer", [])
        .service("debouncer", Debouncer.factory);

    angular
        .module("input", [])
        .directive("autofocus", AutofocusDirective.directive);
}

export default depend;
export {depend};
