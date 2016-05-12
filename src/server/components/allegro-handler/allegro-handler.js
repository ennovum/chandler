import config from "./../../config/config.js";

class AllegroHandler {
    constructor(allegroWebapiClient) {
        this._client = allegroWebapiClient;

        this._client.configure(config.allegroWebapi);
    }

    listing(req, res) {
        let query = req.query.query;
        let page = Number(req.query.page);

        this._client.getListingResult(query, page)
            .then((searchResult) => {
                res.send(searchResult);
            }, (err) => {
                res.status(500).send(err);
            });
    }
}

AllegroHandler.factory = (...args) => new AllegroHandler(...args);
AllegroHandler.factory.$inject = ["allegroWebapiClient"];

export default AllegroHandler;
export {AllegroHandler};
