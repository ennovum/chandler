import angular from "angular";

import {
    AllegroClient
} from "./../components/allegro-client/allegro-client.js";

import {
    AllegroCostimizer
} from "./../../shared/components/allegro-costimizer/allegro-costimizer.js";

import {
    CostimizerUiController,
    CostimizerUiDirective,
    CostimizerUiQueriesController,
    CostimizerUiQueriesDirective,
    CostimizerUiResultsController,
    CostimizerUiResultsDirective
} from "./../components/costimizer-ui/costimizer-ui.js";

import {
    TogglerController,
    TogglerDirective
} from "./../../shared/components/toggler/toggler.js";

import {
    LoadingController,
    LoadingDirective
} from "./../../shared/components/loading/loading.js";

function depend() {
    angular
        .module("allegroClient", [])
        .service("allegroClient", AllegroClient.service);

    angular
        .module("allegroCostimizer", [])
        .factory("allegroCostimizer", AllegroCostimizer.factory);

    angular
        .module("costimizerUi", [])
        .controller("costimizerUi", CostimizerUiController.controller)
        .directive("costimizerUi", CostimizerUiDirective.directive)
        .controller("costimizerUiQueries", CostimizerUiQueriesController.controller)
        .directive("costimizerUiQueries", CostimizerUiQueriesDirective.directive)
        .controller("costimizerUiResults", CostimizerUiResultsController.controller)
        .directive("costimizerUiResults", CostimizerUiResultsDirective.directive);

    angular
        .module("toggler", [])
        .controller("toggler", TogglerController.controller)
        .directive("toggler", TogglerDirective.directive);

    angular
        .module("loading", [])
        .controller("loading", LoadingController.controller)
        .directive("loading", LoadingDirective.directive);
}

export default depend;
export {depend};
