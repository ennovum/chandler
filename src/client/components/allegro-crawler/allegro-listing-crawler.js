import _ from "lodash";

import config from "./../../config/config.js";

const CURRENCY_MAP = {
    "": "",
    "pln": "PLN",
    "zł": "PLN",
    "zł.": "PLN"
};
const PRICE_REGEX = /^\s*([\d\s,]+)\s+([^\d\s]+)/;
const PRICE_WHITESPACE_REGEX = /\s+/;

class AllegroListingCrawler {
    constructor(fetcher, crawebler, stock) {
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
        return this._stock.have(
            `listingSource/${query}/${page}`,
            () => this._fetcher.fetchText(config.api.resources.allegro.listing(query, page)));
    }

    _parseListingSource(query, page, source) {
        let listingCrDoc = this._crawebler.crawl(source);

        let parsing = {meta: null, data: {offers: null}};

        return this._digListingMeta(query, page, listingCrDoc)
            .then((meta) => parsing.meta = meta)
            .then(() => {
                let offerCrColl = listingCrDoc.collection('#listing-offers .offers .offer');
                return Promise.all(offerCrColl.map((offerCrEl) => this._digListingOffer(offerCrEl)));
            })
            .then((offers) => parsing.data.offers = offers)
            .then(() => parsing);
    }

    _digListingMeta(query, page, listingCrDoc) {
        let pageSize = listingCrDoc.collection('#listing-offers .offers .offer').count();
        let pageCount = listingCrDoc.element('#listing .pagination .last').text();
        let totalCount = null; // not available

        let meta = {page, pageSize, pageCount, totalCount, query};

        return Promise.resolve(meta);
    }

    _digListingOffer(offerCrEl) {
        let id = offerCrEl.attribute('data-id');
        let title = offerCrEl.element('.offer-title').text();
        let price = this._sanitizePrice(offerCrEl.element('.offer-price .statement').text());
        let url = `http://allegro.pl/show_item.php?item=${id}`;
        let photoUrls = JSON.parse(offerCrEl.element('.offer-photo').attribute('data-photo-urls'));

        let offer = {id, title, price, seller: null, url, photoUrls};

        return this._digListingOfferSeller(offerCrEl)
            .then((seller) => offer.seller = seller)
            .then(() => offer);
    }

    _digListingOfferSeller(offerCrEl) {
        let id = offerCrEl.element('.offer-info').attribute('data-seller-id');
        let url = `http://allegro.pl/show_user.php?uid=${id}`;

        let seller = {id, url};

        return Promise.resolve(seller);
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

AllegroListingCrawler.service = (...args) => new AllegroListingCrawler(...args);
AllegroListingCrawler.service.$inject = ['fetcher', 'crawebler', 'stock'];

export default AllegroListingCrawler;
export {AllegroListingCrawler};
