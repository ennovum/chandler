import angular from "angular";

import CostimizerController from "./costimizer-controller.js";
import CostimizerDirective from "./costimizer-directive.js";
import CostimizerQueriesController from "./components/queries/costimizer-queries-controller.js";
import CostimizerQueriesDirective from "./components/queries/costimizer-queries-directive.js";

angular
    .module("costimizer", [])
    .controller("costimizer", CostimizerController.controller)
    .directive("costimizer", CostimizerDirective.directive)
    .controller("costimizerQueries", CostimizerQueriesController.controller)
    .directive("costimizerQueries", CostimizerQueriesDirective.directive);
