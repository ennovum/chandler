import angular from "angular";

import CostimizerController from "./costimizer-controller.js";
import CostimizerDirective from "./costimizer-directive.js";

angular
    .module("costimizer", [])
    .controller("costimizer", CostimizerController.controller)
    .directive("costimizer", CostimizerDirective.directive);
