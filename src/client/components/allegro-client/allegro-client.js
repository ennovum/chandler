import config from "./../../config/config.js";

class AllegroClient {
    constructor($http) {
        this._$http = $http;
    }

    getSearch(query) {
        return this._$http.get(
            config.api.baseUrl + config.api.resources.allegro.search,
            {
                "params": {
                    "query": query
                }
            })
            .then((response) => response.data);
    }
}

AllegroClient.service = ($http) => new AllegroClient($http);
AllegroClient.service.$inject = ["$http"];

export default AllegroClient;
export {AllegroClient};
