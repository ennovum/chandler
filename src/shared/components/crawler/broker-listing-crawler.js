import VendorListingCrawler from './vendor-listing-crawler.js';

class BrokerListingCrawler extends VendorListingCrawler {
    constructor(crawebler) {
        super();

        this._crawebler = crawebler;
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
}

BrokerListingCrawler.service = (...args) => new BrokerListingCrawler(...args);
BrokerListingCrawler.service.$inject = ['crawebler'];

export default BrokerListingCrawler;
export {BrokerListingCrawler};
