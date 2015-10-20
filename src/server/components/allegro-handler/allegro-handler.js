import _ from "lodash";

import config from "./../../config/config.js";

class AllegroHandler {
    constructor(allegroWebapiClient, allegroCostimizer) {
        this._client = allegroWebapiClient;
        this._costimizer = allegroCostimizer;

        this._client.configure(config.allegroWebapi);
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

AllegroHandler.factory = (...args) => new AllegroHandler(...args);
AllegroHandler.factory.$inject = ["allegroWebapiClient", "allegroCostimizer"];

export default AllegroHandler;
export {AllegroHandler};
