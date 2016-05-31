import _ from "lodash";

const CURRENCY_MAP = {
    "": "",
    "pln": "PLN",
    "zł": "PLN",
    "zł.": "PLN"
};
const PRICE_REGEX = /^\s*([\d\s,]+)\s+([^\d\s]+)/;
const PRICE_WHITESPACE_REGEX = /\s+/;

class AbstractListingCrawler {
    constructor(config, fetcher, crawebler, stock) {
        this._config = config;
        this._fetcher = fetcher;
        this._crawebler = crawebler;
        this._stock = stock;
    }

    sipListing(query, done) {
        let isAborted = false;
        let checkAborted = () => isAborted;
        let abort = () => isAborted = true;

        let promise = this._sipListingTail(query, 0, done, checkAborted);
        promise.abort = abort;

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

    _sanitizePrice(rawPrice) {
        let [, rawValue, rawCurrency] = rawPrice.match(PRICE_REGEX);
        let value = this._sanitizePriceValue(rawValue);
        let currency = this._sanitizePriceCurrency(rawCurrency);

        return {value, currency};
    }

    _sanitizePriceValue(rawValue) {
        let textValue = rawValue.replace(PRICE_WHITESPACE_REGEX, "").replace("&nbsp;", "").replace(",", ".");
        let value = Number(textValue);
        return value;
    }

    _sanitizePriceCurrency(rawCurrency) {
        let currency = CURRENCY_MAP[rawCurrency.toLowerCase()];
        return currency;
    }
}

AbstractListingCrawler.service = (...args) => new AbstractListingCrawler(...args);
AbstractListingCrawler.service.$inject = ['config', 'fetcher', 'crawebler', 'stock'];

export default AbstractListingCrawler;
export {AbstractListingCrawler};
