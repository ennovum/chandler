let soap = require("soap");

const PAGE_SIZE = 1000;

class AllegroWebapiClient {
    constructor() {
        /* // sandbox
        this._wsdlUrl = "https://webapi.allegro.pl.webapisandbox.pl/service.php?wsdl";
        // this._userLogin = "RoomwooD";
        // this._userHashPassword = "zvznYAUwiwnZsVlIVzvH85hwKPS4Y3K5wYFa/GBLtH4=";
        this._countryCode = 1;
        this._webapiKey = "saa83f74";
        */

        // real deal
        this._wsdlUrl = "https://webapi.allegro.pl/service.php?wsdl";
        // this._userLogin = "RoomwooD";
        // this._userHashPassword = "sOjWNdIvB9l5ndc5KJrQtDe0K54HZzxPgypVeCKubeo=";
        this._countryCode = 1;
        this._webapiKey = "dc812255";

        this._client = null;
        this._localVersion = null;
        this._sessionHandle = null;
    }

    search(query, done) {
        this._clientCreate((err, client) => {
            if (err) {
                done(err);
                return;
            }

            this._clientSearch(query, (err, result) => {
                if (err) {
                    done(err);
                    return;
                }

                done(null, result);
            });
        });
    }

    _clientCreate(done) {
        soap.createClient(this._wsdlUrl, (err, client) => {
            if (err) {
                done(err);
                return;
            }

            this._client = client;

            done(null, client);

            /*let params = {
                "sysvar": 3,
                "countryId": this._countryCode,
                "webapiKey": this._webapiKey
            };

            client.doQuerySysStatus(params, (err, result) => {
                if (err) {
                    done(err);
                    return;
                }

                this._localVersion = result.verKey;

                let params = {
                    "userLogin": this._userLogin,
                    "userHashPassword": this._userHashPassword,
                    "countryCode": this._countryCode,
                    "webapiKey": this._webapiKey,
                    "localVersion": result.verKey
                };

                client.doLoginEnc(params, (err, result) => {
                    if (err) {
                        done(err);
                        return;
                    }

                    this._sessionHandle = result.sessionHandlePart;

                    done(null, client);
                });
            });*/
        });
    }

    _clientSearch(query, done) {
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

        this._client.doGetItemsList(params, (err, result) => {
            if (err) {
                done(err);
                return;
            }

            done(null, {
                meta: {
                    page: 0,
                    pageSize: PAGE_SIZE,
                    totalCount: result.itemsCount
                },
                data: result.itemsList.item
            });
        });
    }
}

AllegroWebapiClient.service = () => new AllegroWebapiClient();
AllegroWebapiClient.service.$inject = [];

export default AllegroWebapiClient;
