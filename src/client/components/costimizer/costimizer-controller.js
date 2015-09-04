class CostimizerController {
    constructor(allegroClient) {
        this._allegroClient = allegroClient;

        this.model = {
            queries: []
        };

        this.costimizedOffers = null;

        this.addQuery();
    }

    addQuery() {
        this.model.queries.push("");
    }

    removeQuery(index) {
        this.model.queries.splice(index, 1);
    }

    submitQueries() {
        this._allegroClient.getCostimize(this.model.queries)
            .then((result) => {
                this.costimizedOffers = result.data;
            })
            .catch(() => {
                // TODO
            });
    }
}

CostimizerController.controller = (allegroClient) => new CostimizerController(allegroClient);
CostimizerController.controller.$inject = ["allegroClient"];

export default CostimizerController;
