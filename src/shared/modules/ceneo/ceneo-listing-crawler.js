import AggregatorListingCrawler from 'crawler/aggregator-listing-crawler';

class CeneoListingCrawler extends AggregatorListingCrawler {
    constructor(ceneoLinker, fetcher, crawebler, stock) {
        super(crawebler);

        this._ceneoLinker = ceneoLinker;
        this._fetcher = fetcher;
        this._stock = stock;
    }

    _fetchListingSource(query, page) {
        let url = this._ceneoLinker.getListingURL(query.phrase, page);

        return this._stock.have(
            `ceneo/listingSource/${query.phrase}/${page}`,
            () => this._fetcher.fetchText(url));
    }

    _digListingMeta(query, page, listingCrDoc) {
        let pageSize = listingCrDoc.collection('.category-list-body .cat-prod-row').count() || 0;
        let pageCount = listingCrDoc.element('.pagination > ul > li:not(.page-arrow)').number() || 1;

        let meta = {page, pageSize, pageCount, query};

        return Promise.resolve(meta);
    }

    _findListingProducts(listingCrDoc) {
        let listingProductCrColl = listingCrDoc.collection('.category-list-body .cat-prod-row, .category-list-body .category-item-box');

        return Promise.resolve(listingProductCrColl);
    }

    _digListingProduct(listingProductCrEl) {
        let id = listingProductCrEl.attribute('data-pid');

        let listingProduct = {id};

        return Promise.resolve(listingProduct);
    }

    _fetchProductSource(listingProduct) {
        let id = listingProduct.id;
        let url = this._ceneoLinker.getProductURL(id);

        return this._stock.have(
            `ceneo/productSource/${id}`,
            () => this._fetcher.fetchText(url));
    }

    _digProduct(productCrDoc) {
        let id = productCrDoc.element('.product-meta .add-to-favorite').attribute('data-pid');

        let product = {id, offers: null};

        return Promise.resolve(product);
    }

    _findProductOffers(productCrDoc) {
        let productOfferCrColl = productCrDoc.collection('.product-offers .product-offer');

        return Promise.resolve(productOfferCrColl);
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
CeneoListingCrawler.service.$inject = ['ceneoLinker', 'fetcher', 'crawebler', 'stock'];

export default CeneoListingCrawler;
export {CeneoListingCrawler};
