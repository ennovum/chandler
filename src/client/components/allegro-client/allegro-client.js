import config from "./../../config/config.js";

class AllegroClient {
    constructor($http) {
        this._$http = $http;
    }

    sipSearch(query, done) {
        let isAborted = false;
        let checkAborted = () => isAborted;
        let abort = () => isAborted = true;

        let promise = this._sipSearchTail(query, 0, done, checkAborted);
        promise.abort = abort;

        return promise;
    }

    _sipSearchTail(query, page, done, checkAborted) {
        return this._getSearchPage(query, page)
            .then((result) => {
                if (!checkAborted() && ((result.meta.page + 1) * result.meta.pageSize < result.meta.totalCount)) {
                    done(result, false);
                    return this._sipSearchTail(query, page + 1, done, checkAborted);
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

AllegroClient.factory = ($http) => new AllegroClient($http);
AllegroClient.factory.$inject = ["$http"];

export default AllegroClient;
export {AllegroClient};
