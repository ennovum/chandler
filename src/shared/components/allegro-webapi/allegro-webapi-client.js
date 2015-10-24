import _ from "lodash";
import soap from "soap";

class AllegroWebapiClient {
    constructor(allegroWebapiSanitizer) {
        this._sanitizer = allegroWebapiSanitizer;
    }

    configure(config) {
        this._wsdlUrl = config.wsdlUrl;
        this._countryCode = config.countryCode;
        this._webapiKey = config.webapiKey;
        this._pageSize = config.pageSize;
        this._chunkSize = config.chunkSize;
    }

    getSearchResult(query, page) {
        return this._createClient()
            .then((client) => this._getRawSearchPageResult(client, query, page, this._pageSize))
            .then((rawSearchResult) => this._sanitizer.sanitizeSearchResult(rawSearchResult));
    }

    _createClient() {
        return new Promise((resolve, reject) => {
            soap.createClient(this._wsdlUrl, (err, client) => {
                if (err) {
                    return reject(err);
                }

                return resolve(client);
            });
        });
    }

    _getRawSearchPageResult(client, query, page, pageSize) {
        let chunkSize = this._chunkSize;
        let chunkCount = _.ceil(pageSize / chunkSize);
        let chunk;
        let chunkQueue = [];

        for (chunk = 0; chunk < chunkCount; chunk++) {
            chunkQueue.push(this._getRawSearchChunkResult(client, query, page, pageSize, chunk, chunkSize));
        }

        return Promise.all(chunkQueue)
            .then((searchChunkResults) => {
                let meta = {
                    page,
                    pageSize,
                    totalCount: searchChunkResults[0].meta.totalCount,
                    query
                };
                let data = _.reduce(searchChunkResults, (data, searchChunkResult) => data.concat(searchChunkResult.data), []).slice(0, pageSize);

                return {meta, data};
            });
    }

    _getRawSearchChunkResult(client, query, page, pageSize, chunk, chunkSize) {
        let params = {
            "webapiKey": this._webapiKey,
            "countryId": this._countryCode,
            "filterOptions": {
                "item": [
                    {
                        "filterId": "search",
                        "filterValueId": {
                            "item": [query]
                        }
                    }
                ]
            },
            "resultSize": chunkSize,
            "resultOffset": (page * pageSize) + (chunk * chunkSize),
            "resultScope": 2
        };

        return new Promise((resolve, reject) => {
            client.doGetItemsList(params, (err, result) => {
                if (err) {
                    return reject(err);
                }

                let totalCount = result.itemsCount;

                let meta = {chunk, chunkSize, totalCount, query};
                let data = result.itemsList && result.itemsList.item || [];

                return resolve({meta, data});
            });
        });
    }
}

AllegroWebapiClient.factory = (...args) => new AllegroWebapiClient(...args);
AllegroWebapiClient.factory.$inject = ["allegroWebapiSanitizer"];

export default AllegroWebapiClient;
export {AllegroWebapiClient};
