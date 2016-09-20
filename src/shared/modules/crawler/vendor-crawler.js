class VendorCrawler {
    constructor(crawebler) {
        this._crawebler = crawebler;
    }

    _parseSource(source) {
        let crDoc = this._crawebler.crawl(source);

        return Promise.resolve(crDoc);
    }
}

VendorCrawler.service = (...args) => new VendorCrawler(...args);
VendorCrawler.service.$inject = ['crawebler'];

export default VendorCrawler;
export {VendorCrawler};
