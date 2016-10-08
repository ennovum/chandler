import VendorCrawler from './vendor-crawler';

const CURRENCY_MAP = {
    '': 'PLN',
    'zł': 'PLN'
};
const PRICE_REGEX = /^\s*([\d\s,]+)\s*([^\d\s]+)/;
const PRICE_WHITESPACE_REGEX = /(\s|&nbsp;)+/;

class VendorListingCrawler extends VendorCrawler {
    constructor(crawebler) {
        super(crawebler);

        this._currencyMap = CURRENCY_MAP;
        this._priceRegex = PRICE_REGEX;
        this._priceWhitespaceRegex = PRICE_WHITESPACE_REGEX;
    }

    getListingPage(query, page) {
        return this._fetchListingSource(query, page)
            .then((source) => this._parseSource(source))
            .then((listingCrDoc) => this._getListing(query, page, listingCrDoc));
    }

    _parseSource(source) {
        let crDoc = this._crawebler.crawl(source);

        return Promise.resolve(crDoc);
    }

    _sanitizePrice(rawPrice) {
        let [, rawValue, rawCurrency] = rawPrice.match(this._priceRegex);
        let value = this._sanitizePriceValue(rawValue);
        let currency = this._sanitizePriceCurrency(rawCurrency);

        return {value, currency};
    }

    _sanitizePriceValue(rawValue) {
        let textValue = rawValue.replace(this._priceWhitespaceRegex, '').replace(',', '.');
        let value = Number(textValue);
        return value;
    }

    _sanitizePriceCurrency(rawCurrency) {
        let currency = this._currencyMap[rawCurrency.toLowerCase()];
        return currency;
    }
}

VendorListingCrawler.service = (...args) => new VendorListingCrawler(...args);
VendorListingCrawler.service.$inject = ['crawebler'];

export default VendorListingCrawler;
export {VendorListingCrawler};
