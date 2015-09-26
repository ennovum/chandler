import angular from "angular";

import CostimizerController from "./costimizer-controller.js";
import CostimizerDirective from "./costimizer-directive.js";
import CostimizerQueriesController from "./components/queries/costimizer-queries-controller.js";
import CostimizerQueriesDirective from "./components/queries/costimizer-queries-directive.js";
import CostimizerResultsController from "./components/results/costimizer-results-controller.js";
import CostimizerResultsDirective from "./components/results/costimizer-results-directive.js";

angular
    .module("costimizer", [])
    .controller("costimizer", CostimizerController.controller)
    .directive("costimizer", CostimizerDirective.directive)
    .controller("costimizerQueries", CostimizerQueriesController.controller)
    .directive("costimizerQueries", CostimizerQueriesDirective.directive)
    .controller("costimizerResults", CostimizerResultsController.controller)
    .directive("costimizerResults", CostimizerResultsDirective.directive);
