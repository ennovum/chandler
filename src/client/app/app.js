import es6Promise from "es6Promise";
import _ from "lodash";
import angular from "angular";
import "angularRoute";

import depend from "./depend.js";
import routing from "./routing.js";

es6Promise.polyfill();

depend();

angular
    .module("app", [
        "ngRoute",
        "allegroClient",
        "allegroCostimizer",
        "costimizerUi",
        "toggler",
        "loading",
        "fetcher"
    ])
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
export {App};
