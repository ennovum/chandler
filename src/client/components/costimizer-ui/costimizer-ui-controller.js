class CostimizerUiController {
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

CostimizerUiController.controller = (...args) => new CostimizerUiController(...args);
CostimizerUiController.controller.$inject = ["allegroClient"];

export default CostimizerUiController;
export {CostimizerUiController};
