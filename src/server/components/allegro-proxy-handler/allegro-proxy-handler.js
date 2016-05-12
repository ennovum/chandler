class AllegroProxyHandler {
    constructor(fetcher) {
        this._fetcher = fetcher;
    }

    listing(req, res) {
        let query = req.query['query'];
        let page = Number(req.query['page']);

        let encodedQuery = encodeURIComponent(query);
        let url = `http://allegro.pl/listing/listing.php?order=t&string=${encodedQuery}&p=${page}`;

        this._fetcher.fetchText(url).then((source) => {
            res.send(source);
        });
    }

    listingUserData(req, res) {
        let userId = req.query['user-id'];

        let url = `http://allegro.pl/listing-user-data/users/${userId}`;

        this._fetcher.fetchText(url).then((source) => {
            res.send(source);
        });
    }
}

AllegroProxyHandler.factory = (...args) => new AllegroProxyHandler(...args);
AllegroProxyHandler.factory.$inject = ['fetcher'];

export default AllegroProxyHandler;
export {AllegroProxyHandler};
