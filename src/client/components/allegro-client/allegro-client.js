import config from "./../../config/config.js";

class AllegroClient {
    constructor($http) {
        this._$http = $http;
    }

    sipSearch(query, done) {
        return this._sipSearchTail(query, 0, done);
    }

    _sipSearchTail(query, page, done) {
        return this._getSearchPage(query, page)
            .then((result) => {
                if ((result.meta.page + 1) * result.meta.pageSize < result.meta.totalCount) {
                    done(result, false);
                    return this._sipSearchTail(query, page + 1, done);
                }
                else {
                    done(result, true);
                }
            });
    }

    _getSearchPage(query, page) {
        return this._$http.get(
            config.api.baseUrl + config.api.resources.allegro.search,
            {
                "params": {
                    "query": query,
                    "page": page
                }
            })
            .then((response) => response.data);
    }
}

AllegroClient.service = ($http) => new AllegroClient($http);
AllegroClient.service.$inject = ["$http"];

export default AllegroClient;
export {AllegroClient};
