import AllegroWebapiClient from "./webapi-client.js";

class AllegroHandler {
    handle(req, res) {
        let client = new AllegroWebapiClient();

        client.search(req.query.query)
            .then((result) => {
                res.send(result);
            }, (err) => {
                res.status(500).send(err);
            });
    }
}

AllegroHandler.service = () => new AllegroHandler();
AllegroHandler.service.$inject = [];

export default AllegroHandler;
