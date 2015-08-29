let angular = require("angular");
require("angular-route");
let _ = require("lodash");

import config from "./config.js";
import routing from "./routing.js";

import AllegroClient from "./../allegro/client.js";
import ChandlerDirective from "./../chandler/chandler.js";

class App {
    constructor() {
        this._create();
        this._configure();
    }

    _create() {
        this._ngApp = angular.module("app", ["ngRoute"]);

        this._ngApp.service("allegroClient", AllegroClient.service);
        this._ngApp.directive("chandler", ChandlerDirective.directive);
    }

    _configure() {
        let configure = ($routeProvider) => {
            _.forEach(routing.routes, (route, path) => $routeProvider.when(path, route));

            $routeProvider.otherwise({
                "redirectTo": routing.defaultPath
            });
        };
        configure.$inject = ["$routeProvider"];

        this._ngApp.config(configure);
    }

    run() {
        angular.bootstrap(document, ["app"]);
    }
}

export default App;
