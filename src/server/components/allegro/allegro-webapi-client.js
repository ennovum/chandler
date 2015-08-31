import soap from "soap";

import config from "./../../config/config.js";

class AllegroWebapiClient {
    constructor() {
        this._wsdlUrl = "https://webapi.allegro.pl/service.php?wsdl";
        this._countryCode = 1;
        this._webapiKey = "dc812255";
    }

    search(query) {
        return this._createClient()
            .then((client) => this._getResults(client, query));
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

    _getResults(client, query, page = 0) {
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
            "resultSize": config.allegro.pageSize,
            "resultOffset": page * config.allegro.pageSize,
            "resultScope": 2
        };

        return new Promise((resolve, reject) => {
            client.doGetItemsList(params, (err, result) => {
                if (err) {
                    return reject(err);
                }

                return resolve({
                    meta: {
                        page: page,
                        pageSize: config.allegro.pageSize,
                        totalCount: result.itemsCount
                    },
                    data: result.itemsList.item
                });
            });
        });
    }
}

AllegroWebapiClient.factory = () => new AllegroWebapiClient();
AllegroWebapiClient.factory.$inject = [];

export default AllegroWebapiClient;
