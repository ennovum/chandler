let express = require("express");
let morgan = require("morgan");
let _ = require("lodash");

import config from "./config.js";
import routing from "./routing.js";
import injector from "./injector.js";

import AllegroHandler from "./../services/allegro/handler.js";

class App {
    constructor() {
        this._create();
        this._configure();
    }

    _create() {
        this._app = express();

        this._app.use(express.static(config.root));
        this._app.use(morgan("combined"));

        injector.instantiate("allegroHandler", AllegroHandler.service);
    }

    _configure() {
        _.forEach(routing.routes, (route, path) => {
            let handler = injector.get(route.handler);
            this._app.all(config.baseUrl + path, (req, res) => handler.handle(req, res));
        });
    }

    run() {
        this._app.listen(config.port, () => {
            console.log("server started");
        });
    }
}

export default App;
