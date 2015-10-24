let config = {
    "server": {
        "root": __dirname + "/../../..",
        "port": "8080",
        "baseUrl": "/api"
    },
    "allegroWebapi": {
        "wsdlUrl": "https://webapi.allegro.pl/service.php?wsdl",
        "countryCode": 1,
        "webapiKey": "",
        "pageSize": 100,
        "chunkSize": 25
    }
};

export default config;
export {config};
