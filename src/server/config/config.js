export default {
    "server": {
        "root": __dirname + "/../../..",
        "port": "8080",
        "baseUrl": "/api"
    },
    "allegro": {
        "wsdlUrl": "https://webapi.allegro.pl/service.php?wsdl",
        "countryCode": 1,
        "webapiKey": "",
        "pageSize": 1000,
        "chunkSize": 100
    }
};
