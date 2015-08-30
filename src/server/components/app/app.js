import express from "express";
import morgan from "morgan";
import _ from "lodash";

import config from "./../../config/config.js";
import routing from "./routing.js";

import injector from "./../../../shared/components/injector/injector.js";
import AllegroHandler from "./../allegro/handler.js";

class App {
    constructor() {
        this._create();
        this._configure();
    }

    _create() {
        this._app = express();

        this._app.use(express.static(config.server.root));
        this._app.use(morgan("combined"));

        injector.instantiate("allegroHandler", AllegroHandler.service);
    }

    _configure() {
        _.forEach(routing.routes, (route, path) => {
            let handler = injector.get(route.handler);
            this._app.all(config.server.baseUrl + path, (req, res) => handler.handle(req, res));
        });
    }

    run() {
        this._app.listen(config.server.port, () => {
            console.log("server started");
        });
    }
}

export default App;
