import AllegroWebapiClient from "./webapi-client.js";

class AllegroHandler {
    handle(req, res) {
        let client = new AllegroWebapiClient();

        client.search(req.query.query, (err, result) => {
            if (err) {
                res.status(500).send(err);
                return;
            }

            res.send(result);
        });
    }
}

AllegroHandler.service = () => new AllegroHandler();
AllegroHandler.service.$inject = [];

export default AllegroHandler;
