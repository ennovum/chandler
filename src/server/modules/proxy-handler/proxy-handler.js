class ProxyHandler {
    constructor(fetcher) {
        this._fetcher = fetcher;
    }

    proxy(req, res) {
        let url = req.query['url'];

        this._fetcher.fetchText(url).then((source) => {
            res.send(source);
        }, (err) => {
            res.status(500).send();
        });
    }
}

ProxyHandler.factory = (...args) => new ProxyHandler(...args);
ProxyHandler.factory.$inject = ['fetcher'];

export default ProxyHandler;
export {ProxyHandler};
