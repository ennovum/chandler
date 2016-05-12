import angular from "angular";

import {
    AllegroClient
} from "./../components/allegro-client/allegro-client.js";

import {
    AllegroCostimizer
} from "./../../shared/components/allegro-costimizer/allegro-costimizer.js";

import {
    CostimizerUiComponent,
    CostimizerUiQueriesComponent,
    CostimizerUiResultsComponent,
} from "./../components/costimizer-ui/costimizer-ui.js";

import {
    TogglerDirective
} from "./../../shared/components/toggler/toggler.js";

import {
    LoadingComponent
} from "./../../shared/components/loading/loading.js";

function depend() {
    angular
        .module("allegroClient", [])
        .service("allegroClient", AllegroClient.factory);

    angular
        .module("allegroCostimizer", [])
        .service("allegroCostimizer", AllegroCostimizer.factory);

    angular
        .module("costimizerUi", [])
        .component("costimizerUi", CostimizerUiComponent.component)
        .component("costimizerUiQueries", CostimizerUiQueriesComponent.component)
        .component("costimizerUiResults", CostimizerUiResultsComponent.component);

    angular
        .module("toggler", [])
        .directive("toggler", TogglerDirective.directive);

    angular
        .module("loading", [])
        .component("loading", LoadingComponent.component);
}

export default depend;
export {depend};
