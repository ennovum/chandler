let soap = require("soap");

const PAGE_SIZE = 1000;

class AllegroWebapiClient {
    constructor() {
        this._wsdlUrl = "https://webapi.allegro.pl/service.php?wsdl";
        this._countryCode = 1;
        this._webapiKey = "dc812255";

        this._client = null;
    }

    search(query) {
        return this._clientCreate()
            .then((client) => this._clientSearch(query));
    }

    _clientCreate() {
        return new Promise((resolve, reject) => {
            soap.createClient(this._wsdlUrl, (err, client) => {
                if (err) {
                    reject(err);
                    return;
                }

                this._client = client;

                resolve(client);
            });
        });
    }

    _clientSearch(query) {
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
            "resultSize": PAGE_SIZE
        };

        return new Promise((resolve, reject) => {
            this._client.doGetItemsList(params, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve({
                    meta: {
                        page: 0,
                        pageSize: PAGE_SIZE,
                        totalCount: result.itemsCount
                    },
                    data: result.itemsList.item
                });
            });
        });
    }
}

AllegroWebapiClient.service = () => new AllegroWebapiClient();
AllegroWebapiClient.service.$inject = [];

export default AllegroWebapiClient;
