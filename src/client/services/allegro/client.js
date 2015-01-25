import config from "./../../app/config.js";

class AllegroClient {
    constructor($http) {
        this._$http = $http;
    }

    getResults(query) {
        return this._$http.get(config.api.baseUrl + "/allegro", {
            "params": {
                "query": query
            }
        });
    }
}

AllegroClient.service = ($http) => new AllegroClient($http);
AllegroClient.service.$inject = ["$http"];

export default AllegroClient;
