import angular from "angular";

import TogglerController from "./toggler-controller.js";
import TogglerDirective from "./toggler-directive.js";

angular
    .module("toggler", [])
    .controller("toggler", TogglerController.controller)
    .directive("toggler", TogglerDirective.directive);
