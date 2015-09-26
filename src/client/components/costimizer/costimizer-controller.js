export default class CostimizerController {
    constructor(allegroClient) {
        this._allegroClient = allegroClient;

        this.mainmenuOption = null;

        this.model = {
            queries: [""]
        };

        this.on = {
            submitQueries: () => this.submitQueries()
        };

        this.costimizedOffers = null;
    }

    mainmenuToggle(option) {
        this.mainmenuOption = this.mainmenuOption === option ? null : option;
    }

    mainmenuIs(option) {
        return this.mainmenuOption === option;
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
