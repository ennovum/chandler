class CostimizerController {
    constructor(allegroClient) {
        this._allegroClient = allegroClient;

        this.model = {};
    }

    submit() {
        let query = this.model.query;

        this._allegroClient.getResults(query)
            .then((result) => {
                // TODO
            })
            .catch((err) => {
                // TODO
            });
    }
}

CostimizerController.controller = (allegroClient) => new CostimizerController(allegroClient);
CostimizerController.controller.$inject = ["allegroClient"];

export default CostimizerController;
