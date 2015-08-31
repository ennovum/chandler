import _ from "lodash";
import injector from "injector";

class AllegroHandler {
    constructor() {
        this._client = injector.get('allegroWebapiClient');
        this._costimizer = injector.get('allegroCostimizer');
    }

    costimize(req, res) {
        let queries = _.isArray(req.query.queries) ? req.query.queries : [req.query.queries];

        Promise.all(_.map(queries, (query) => this._client.search(query)))
            .then((results) => this._costimizer.costimize(_.map(results, (result) => result.data)))
            .then((result) => {
                res.send(result);
            }, (err) => {
                res.status(500).send(err);
            });
    }
}

AllegroHandler.factory = () => new AllegroHandler();
AllegroHandler.factory.$inject = [];

export default AllegroHandler;
