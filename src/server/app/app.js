import express from 'express';
import morgan from 'morgan';
import forEach from 'lodash/forEach';
import conf from 'conf';
import injector from 'shared/injector/in-module';
import 'shared/conf/in-module';
import 'server/proxy-handler/in-module';

import routing from './routing';

class App {
    constructor() {
        this._create();
        this._configure();
    }

    _create() {
        this._app = express();

        this._app.use(express.static(conf.server.root));
        this._app.use(morgan('combined'));
    }

    _configure() {
        forEach(routing.routes, (route, path) => {
            let handler = injector.get(route.handler);
            let method = route.method || 'handle';

            this._app.all(conf.server.baseUrl + path, (req, res) => handler[method](req, res));
        });
    }

    run() {
        this._app.listen(conf.server.port, () => {
            // noop
        });
    }
}

export default App;
export {App};
