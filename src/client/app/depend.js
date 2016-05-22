import angular from "angular";

import {
    AllegroListingCrawler,
    AllegroSellerCrawler
} from "./../components/allegro-crawler/allegro-crawler.js";

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

function depend() {
    angular
        .module("allegroCrawler", [])
        .service("allegroListingCrawler", AllegroListingCrawler.service)
        .service("allegroSellerCrawler", AllegroSellerCrawler.service);

    angular
        .module("costimizer", [])
        .service("costimizer", Costimizer.factory);

    angular
        .module("costimizerUi", [])
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
}

export default depend;
export {depend};
