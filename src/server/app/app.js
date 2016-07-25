import es6Promise from 'es6Promise';
import express from 'express';
import morgan from 'morgan';
import _ from 'lodash';
import config from 'config';

import Injector from './../../shared/modules/injector/injector.js';

import depend from './depend.js';
import routing from './routing.js';

es6Promise.polyfill();

let injector = new Injector();
depend(injector);

class App {
    constructor() {
        this._create();
        this._configure();
    }

    _create() {
        this._app = express();

        this._app.use(express.static(config.server.root));
        this._app.use(morgan('combined'));
    }

    _configure() {
        _.forEach(routing.routes, (route, path) => {
            let handler = injector.get(route.handler);
            let method = route.method || 'handle';

            this._app.all(config.server.baseUrl + path, (req, res) => handler[method](req, res));
        });
    }

    run() {
        this._app.listen(config.server.port, () => {
            // noop
        });
    }
}

export default App;
export {App};
