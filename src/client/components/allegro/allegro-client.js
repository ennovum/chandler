import config from "./../../config/config.js";

class AllegroClient {
    constructor($http) {
        this._$http = $http;
    }

    getCostimize(queries) {
        return this._$http.get(config.api.baseUrl + config.api.resources.allegro.costimize, {
                "params": {
                    "queries": queries
                }
            })
            .then((response) => response.data);
    }
}

AllegroClient.service = ($http) => new AllegroClient($http);
AllegroClient.service.$inject = ["$http"];

export default AllegroClient;
