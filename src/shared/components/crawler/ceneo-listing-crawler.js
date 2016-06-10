import _ from 'lodash';

import VendorListingCrawler from './vendor-listing-crawler.js';

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
            `ceneo/listingSource/${query.phrase}/${page}`,
            () => this._fetcher.fetchText(this._config.api.resources.ceneo.listing(query.phrase, page)));
    }

    _parseListingSource(query, page, source) {
        let listingCrDoc = this._crawebler.crawl(source);

        return Promise.resolve(listingCrDoc);
    }

    _getListing(query, page, listingCrDoc) {
        let listing = {meta: null, data: {offers: null}};

        return this._digListingMeta(query, page, listingCrDoc)
            .then((meta) => listing.meta = meta)
            .then(() => this._findListingProducts(listingCrDoc))
            .then((listingProductCrColl) => this._getListingProducts(listingProductCrColl))
            .then((products) => {
                listing.data.offers = _.reduce(products, (offers, product) => offers.concat(product.offers), []);
            })
            .then(() => listing);
    }

    _digListingMeta(query, page, listingCrDoc) {
        let pageSize = listingCrDoc.collection('.category-list-body .cat-prod-row').count();
        let pageCount = listingCrDoc.element('.pagination > ul > li:not(.page-arrow)').number();

        let meta = {page, pageSize, pageCount, query};

        return Promise.resolve(meta);
    }

    _findListingProducts(listingCrDoc) {
        let listingProductCrColl = listingCrDoc.collection('.category-list-body .cat-prod-row');

        return Promise.resolve(listingProductCrColl);
    }

    _getListingProducts(listingProductCrColl) {
        return Promise.all(listingProductCrColl.map((listingProductCrEl) => {
            let listingProduct;
            let product;

            return this._digListingProduct(listingProductCrEl)
                .then((_listingProduct) => listingProduct = _listingProduct)
                .then(() => this._fetchProductSource(listingProduct))
                .then((source) => this._parseProductSource(source))
                .then((productCrDoc) => this._getProduct(productCrDoc));
        }));
    }

    _digListingProduct(listingProductCrEl) {
        let id = listingProductCrEl.attribute('data-pid');

        let listingProduct = {id};

        return Promise.resolve(listingProduct);
    }

    _fetchProductSource(listingProduct) {
        let id = listingProduct.id;

        return this._stock.have(
            `ceneo/productSource/${id}`,
            () => this._fetcher.fetchText(this._config.api.resources.ceneo.product(id)));
    }

    _parseProductSource(source) {
        let productCrDoc = this._crawebler.crawl(source);

        return Promise.resolve(productCrDoc);
    }

    _getProduct(productCrDoc) {
        let product;

        return this._digProduct(productCrDoc)
            .then((_product) => product = _product)
            .then(() => this._findProductOffers(productCrDoc))
            .then((productOfferCrColl) => this._getProductOffers(productOfferCrColl))
            .then((productOffers) => product.offers = productOffers)
            .then(() => product);
    }

    _digProduct(productCrDoc) {
        let id = productCrDoc.element('.offer-summary .go-to-shop').attribute('data-productid') ||
            productCrDoc.element('.product-meta .clipboard-add').attribute('data-pid');

        let product = {id, offers: null};

        return Promise.resolve(product);
    }

    _findProductOffers(productCrDoc) {
        let productOfferCrColl = productCrDoc.collection('.product-offers .product-offer');

        return Promise.resolve(productOfferCrColl);
    }

    _getProductOffers(productOfferCrColl) {
        return Promise.all(productOfferCrColl.map((productOfferCrEl) => {
            let productOffer;

            return this._digProductOffer(productOfferCrEl)
                .then((_productOffer) => productOffer = _productOffer)
                .then(() => this._digListingOfferSeller(productOfferCrEl))
                .then((productOfferSeller) => productOffer.seller = productOfferSeller)
                .then(() => productOffer);
        }));
    }

    _digProductOffer(productOfferCrEl) {
        let id = productOfferCrEl.attribute('data-productid');
        let title = productOfferCrEl.element('.product-name').text();
        let price = this._sanitizePrice(productOfferCrEl.element('.product-price').text());
        let url = `http://www.ceneo.pl/${id}`;
        let photoUrls = []; // TODO

        let productOffer = {id, title, price, seller: null, url, photoUrls};

        return Promise.resolve(productOffer);
    }

    _digListingOfferSeller(productOfferCrEl) {
        let id = productOfferCrEl.attribute('data-shop');
        let name = productOfferCrEl.element('.cell-store-logo .store-logo img').attribute('alt') ||
            productOfferCrEl.element('.cell-store-logo .displayed-shop-name').text();
        let rating = productOfferCrEl.element('.cell-store-review .screen-reader-text').text().replace('Ocena ', '').replace(/\s/g, '');
        let uri = productOfferCrEl.nextElement().collection('.offer-links a').element(0).attribute('href');
        let url = `http://www.ceneo.pl${uri}`;

        name = `ceneo.pl / ${name}`;

        let productOfferSeller = {id, name, rating, url};

        return Promise.resolve(productOfferSeller);
    }
}

CeneoListingCrawler.service = (...args) => new CeneoListingCrawler(...args);
CeneoListingCrawler.service.$inject = ['config', 'fetcher', 'crawebler', 'stock'];

export default CeneoListingCrawler;
export {CeneoListingCrawler};
