export default class CostimizerController {
    constructor(allegroClient) {
        this._allegroClient = allegroClient;

        this.model = {
            queries: [""]
        };

        this.on = {
            submitQueries: () => this.submitQueries()
        };

        this.results = null;
    }

    submitQueries() {
        this._allegroClient.getCostimize(this.model.queries)
            .then((result) => {
                this.results = result.data;
            })
            .catch(() => {
                // TODO
            });
    }
}

CostimizerController.controller = (allegroClient) => new CostimizerController(allegroClient);
CostimizerController.controller.$inject = ["allegroClient"];
