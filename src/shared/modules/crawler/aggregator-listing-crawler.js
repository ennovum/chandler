import _ from 'lodash';

import VendorListingCrawler from './vendor-listing-crawler.js';

class AggregatorListingCrawler extends VendorListingCrawler {
    constructor(crawebler) {
        super();

        this._crawebler = crawebler;
    }

    _getListing(query, page, listingCrDoc) {
        let listing = {meta: null, offers: null};

        return this._digListingMeta(query, page, listingCrDoc)
            .then((meta) => listing.meta = meta)
            .then(() => this._findListingProducts(listingCrDoc))
            .then((listingProductCrColl) => this._getListingProducts(listingProductCrColl))
            .then((products) => {
                listing.offers = _.reduce(products, (offers, product) => offers.concat(product.offers), []);
            })
            .then(() => listing);
    }

    _getListingProducts(listingProductCrColl) {
        return Promise.all(listingProductCrColl.map((listingProductCrEl) => {
            let listingProduct;

            return this._digListingProduct(listingProductCrEl)
                .then((_listingProduct) => listingProduct = _listingProduct)
                .then(() => this._fetchProductSource(listingProduct))
                .then((source) => this._parseSource(source))
                .then((productCrDoc) => this._getProduct(productCrDoc));
        }));
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
}

AggregatorListingCrawler.service = (...args) => new AggregatorListingCrawler(...args);
AggregatorListingCrawler.service.$inject = ['crawebler'];

export default AggregatorListingCrawler;
export {AggregatorListingCrawler};
