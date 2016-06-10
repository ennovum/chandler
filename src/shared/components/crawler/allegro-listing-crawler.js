import _ from 'lodash';

import VendorListingCrawler from './vendor-listing-crawler.js';

class AllegroListingCrawler extends VendorListingCrawler {
    constructor(config, fetcher, crawebler, stock) {
        super(config, fetcher, crawebler, stock);

        this._config = config;
        this._fetcher = fetcher;
        this._crawebler = crawebler;
        this._stock = stock;
    }

    _fetchListingSource(query, page) {
        return this._stock.have(
            `allegro/listingSource/${query.phrase}/${page}`,
            () => this._fetcher.fetchText(this._config.api.resources.allegro.listing(query.phrase, page)));
    }

    _parseListingSource(query, page, source) {
        let listingCrDoc = this._crawebler.crawl(source);

        return Promise.resolve(listingCrDoc);
    }

    _getListing(query, page, listingCrDoc) {
        let listing = {meta: null, data: {offers: null}};

        return this._digListingMeta(query, page, listingCrDoc)
            .then((listingMeta) => listing.meta = listingMeta)
            .then(() => this._findListingOffers(listingCrDoc))
            .then((listingOfferCrColl) => this._getListingOffers(listingOfferCrColl))
            .then((listingOffers) => listing.data.offers = listingOffers)
            .then(() => listing);
    }

    _digListingMeta(query, page, listingCrDoc) {
        let pageSize = listingCrDoc.collection('#listing-offers .offers .offer').count();
        let pageCount = listingCrDoc.element('#listing .pagination .last').number();

        let listingMeta = {page, pageSize, pageCount, query};

        return Promise.resolve(listingMeta);
    }

    _findListingOffers(listingCrDoc) {
        let listingOfferCrColl = listingCrDoc.collection('#listing-offers .offers .offer');

        return Promise.resolve(listingOfferCrColl);
    }

    _getListingOffers(listingOfferCrColl) {
        return Promise.all(listingOfferCrColl.map((listingOfferCrEl) => {
            let listingOffer;

            return this._digListingOffer(listingOfferCrEl)
                .then((_listingOffer) => listingOffer = _listingOffer)
                .then(() => this._digListingOfferSeller(listingOfferCrEl))
                .then((listingOfferSeller) => listingOffer.seller = listingOfferSeller)
                .then(() => listingOffer);
        }));
    }

    _digListingOffer(listingOfferCrEl) {
        let id = listingOfferCrEl.attribute('data-id');
        let title = listingOfferCrEl.element('.offer-title').text();
        let price = this._sanitizePrice(listingOfferCrEl.element('.offer-price .statement').text());
        let url = `http://allegro.pl/show_item.php?item=${id}`;
        let photoUrls = JSON.parse(listingOfferCrEl.element('.offer-photo').attribute('data-photo-urls'));

        let listingOffer = {id, title, price, seller: null, url, photoUrls};

        return Promise.resolve(listingOffer);
    }

    _digListingOfferSeller(listingOfferCrEl) {
        let id = listingOfferCrEl.element('.offer-info').attribute('data-seller-id');
        let url = `http://allegro.pl/show_user.php?uid=${id}`;

        let listingOfferSeller = {id, url};

        return Promise.resolve(listingOfferSeller);
    }
}

AllegroListingCrawler.service = (...args) => new AllegroListingCrawler(...args);
AllegroListingCrawler.service.$inject = ['config', 'fetcher', 'crawebler', 'stock'];

export default AllegroListingCrawler;
export {AllegroListingCrawler};
