import es6Promise from "es6Promise";
import _ from "lodash";
import angular from "angular";
import "angularRoute";

import routing from "./routing.js";

import "./../components/allegro/allegro.js";
import "./../components/costimizer/costimizer.js";

es6Promise.polyfill();

angular
    .module("app", ["ngRoute", "allegro", "costimizer"])
    .config(["$routeProvider", ($routeProvider) => {
        _.forEach(routing.routes, (route, path) => $routeProvider.when(path, route));

        $routeProvider.otherwise({
            "redirectTo": routing.defaultPath
        });
    }]);

class App {
    run() {
        angular.bootstrap(document, ["app"]);
    }
}

export default App;
