class CeneoLinker {
    constructor(conf) {
        this._conf = conf;
    }

    getCategoryMapURL() {
        let url = `http://www.ceneo.pl/SiteMap.aspx`;
        return this._decorateURL(url);
    }

    getListingURL(phrase, page) {
        let encodedPhrase = encodeURIComponent(phrase);
        let url = `http://www.ceneo.pl/;szukaj-${encodedPhrase};0020-30-0-0-${page+1}.htm`;
        return this._decorateURL(url);
    }

    getProductURL(productId) {
        let url = `http://www.ceneo.pl/${productId}`;
        return this._decorateURL(url);
    }

    _decorateURL(url) {
        let proxy = this._conf.get('api.proxy');
        if (proxy) {
            url = proxy(url);
        }

        return url;
    }
}

CeneoLinker.service = (...args) => new CeneoLinker(...args);
CeneoLinker.service.$inject = ['conf'];

export default CeneoLinker;
export {CeneoLinker};
