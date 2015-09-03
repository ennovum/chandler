import _ from "lodash";
import injector from "injector";

class AllegroHandler {
    constructor() {
        this._client = injector.get("allegroWebapiClient");
        this._costimizer = injector.get("allegroCostimizer");
    }

    costimize(req, res) {
        let queries = _.isArray(req.query.queries) ? req.query.queries : [req.query.queries];

        Promise.all(_.map(queries, (query) => this._client.getSearchResult(query)))
            .then((searchResults) => this._costimizer.costimizeSearchResults(searchResults))
            .then((costimizeResult) => {
                res.send(costimizeResult);
            }, (err) => {
                res.status(500).send(err);
            });
    }
}

AllegroHandler.factory = () => new AllegroHandler();
AllegroHandler.factory.$inject = [];

export default AllegroHandler;
