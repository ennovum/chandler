import _ from 'lodash';

class VendorListingCrawler {
    constructor(config, fetcher, crawebler, stock) {
        this._config = config;
        this._fetcher = fetcher;
        this._crawebler = crawebler;
        this._stock = stock;
    }

    sipListing(query, done) {
        let checkAborted = () => promise.isAborted;
        let promise = this._sipListingTail(query, 0, done, checkAborted);

        promise.isAborted = false;
        promise.abort = () => {
            promise.isAborted = true;
        };

        return promise;
    }

    _sipListingTail(query, page, done, checkAborted) {
        return this._getListingPage(query, page)
            .then((result) => {
                let isAborted = checkAborted();
                let hasNextPage = (result.meta.page + 1) < result.meta.pageCount;

                if (!isAborted && hasNextPage) {
                    return Promise.resolve(done(result, false))
                        .then(() => this._sipListingTail(query, page + 1, done, checkAborted));
                }
                else {
                    return Promise.resolve(done(result, true));
                }
            });
    }

    _getListingPage(query, page) {
        return this._fetchListingSource(query, page)
            .then((source) => this._parseListingSource(query, page, source));
    }

    _fetchListingSource(query, page) {
        return Promise.reject(); // abstract
    }

    _parseListingSource(query, page, source) {
        return Promise.reject(); // abstract
    }
}

VendorListingCrawler.service = (...args) => new VendorListingCrawler(...args);
VendorListingCrawler.service.$inject = ['config', 'fetcher', 'crawebler', 'stock'];

export default VendorListingCrawler;
export {VendorListingCrawler};
