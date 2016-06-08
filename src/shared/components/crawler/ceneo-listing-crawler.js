import _ from 'lodash';

import VendorListingCrawler from './vendor-listing-crawler.js';

const CURRENCY_MAP = {
    '': 'PLN',
    'zł': 'PLN'
};
const PRICE_REGEX = /^\s*([\d\s,]+)\s*([^\d\s]+)/;

class CeneoListingCrawler extends VendorListingCrawler {
    constructor(config, fetcher, crawebler, stock) {
        super(config, fetcher, crawebler, stock);

        this._config = config;
        this._fetcher = fetcher;
        this._crawebler = crawebler;
        this._stock = stock;
    }

    _fetchListingSource(query, page) {
        return this._stock.have(
            `ceneo/listingSource/${query}/${page}`,
            () => this._fetcher.fetchText(this._config.api.resources.ceneo.listing(query, page)));
    }

    _parseListingSource(query, page, source) {
        let listingCrDoc = this._crawebler.crawl(source);

        let parsing = {meta: null, data: {offers: null}};

        return this._digListingMeta(query, page, listingCrDoc)
            .then((meta) => parsing.meta = meta)
            .then(() => {
                let productCrColl = listingCrDoc.collection('.category-list-body .cat-prod-row');
                return Promise.all(productCrColl.map((productCrEl) => this._digListingProduct(productCrEl)));
            })
            .then((products) => {
                parsing.data.offers = _.reduce(products, (offers, product) => offers.concat(product.offers), []);
            })
            .then(() => parsing);
    }

    _digListingMeta(query, page, listingCrDoc) {
        let pageSize = listingCrDoc.collection('.category-list-body .cat-prod-row').count();
        let pageCount = listingCrDoc.element('.pagination > ul > li:not(.page-arrow)').number();

        let meta = {page, pageSize, pageCount, query};

        return Promise.resolve(meta);
    }

    _digListingProduct(productCrEl) {
        let id = productCrEl.attribute('data-pid');

        return this._fetchProductSource(id)
            .then((source) => this._parseProductSource(id, source));
    }

    _fetchProductSource(id) {
        return this._stock.have(
            `ceneo/productSource/${id}`,
            () => this._fetcher.fetchText(this._config.api.resources.ceneo.product(id)));
    }

    _parseProductSource(id, source) {
        let productCrDoc = this._crawebler.crawl(source);

        let product = {id, offers: null};

        return this._digProductOffers(id, productCrDoc)
            .then((offers) => product.offers = offers)
            .then(() => product);
    }

    _digProductOffers(id, productCrDoc) {
        let productOfferCrColl = productCrDoc.collection('.product-offers .product-offer');

        return Promise.all(productOfferCrColl.map((productOfferCrEl) => this._digProductOffer(id, productOfferCrEl)));
    }

    _digProductOffer(id, productOfferCrEl) {
        let title = productOfferCrEl.element('.product-name').text();
        let price = this._sanitizePrice(productOfferCrEl.element('.product-price').text());
        let url = `http://www.ceneo.pl/${id}`;
        let photoUrls = []; // TODO

        let offer = {id, title, price, seller: null, url, photoUrls};

        return this._digListingOfferSeller(productOfferCrEl)
            .then((seller) => offer.seller = seller)
            .then(() => offer);
    }

    _digListingOfferSeller(productOfferCrEl) {
        let id = productOfferCrEl.attribute('data-shop');
        let name = productOfferCrEl.element('.cell-store-logo .store-logo img').attribute('alt') ||
            productOfferCrEl.element('.cell-store-logo .displayed-shop-name').text();
        let rating = productOfferCrEl.element('.cell-store-review .screen-reader-text').text().replace('Ocena ', '').replace(/\s/g, '');
        let uri = productOfferCrEl.nextElement().collection('.offer-links a').element(0).attribute('href');
        let url = `http://www.ceneo.pl${uri}`;

        name = `ceneo.pl / ${name}`;

        let seller = {id, name, rating, url};

        return Promise.resolve(seller);
    }

    _sanitizePrice(rawPrice) {
        let [, rawValue, rawCurrency] = rawPrice.match(PRICE_REGEX);
        let value = this._sanitizePriceValue(rawValue);
        let currency = this._sanitizePriceCurrency(rawCurrency);

        return {value, currency};
    }

    _sanitizePriceValue(rawValue) {
        let textValue = rawValue.replace(',', '.');
        let value = Number(textValue);
        return value;
    }

    _sanitizePriceCurrency(rawCurrency) {
        let currency = CURRENCY_MAP[rawCurrency.toLowerCase()];
        return currency;
    }
}

CeneoListingCrawler.service = (...args) => new CeneoListingCrawler(...args);
CeneoListingCrawler.service.$inject = ['config', 'fetcher', 'crawebler', 'stock'];

export default CeneoListingCrawler;
export {CeneoListingCrawler};
