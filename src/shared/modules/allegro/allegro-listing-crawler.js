import jsoner from 'jsoner/jsoner.js';

import BrokerListingCrawler from './../crawler/broker-listing-crawler.js';

class AllegroListingCrawler extends BrokerListingCrawler {
    constructor(allegroLinker, fetcher, crawebler, stock) {
        super(crawebler);

        this._allegroLinker = allegroLinker;
        this._fetcher = fetcher;
        this._crawebler = crawebler;
        this._stock = stock;
    }

    _fetchListingSource(query, page) {
        let url = this._allegroLinker.getListingURL(query.phrase, page);

        return this._stock.have(
            `allegro/listingSource/${query.phrase}/${page}`,
            () => this._fetcher.fetchText(url));
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

    _digListingOffer(listingOfferCrEl) {
        let id = listingOfferCrEl.attribute('data-id');
        let title = listingOfferCrEl.element('.offer-title').text();
        let price = this._sanitizePrice(listingOfferCrEl.element('.offer-price .statement').text());
        let url = `http://allegro.pl/show_item.php?item=${id}`;
        let photoUrls = jsoner.parse(listingOfferCrEl.element('.offer-photo').attribute('data-photo-urls'));

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
AllegroListingCrawler.service.$inject = ['allegroLinker', 'fetcher', 'crawebler', 'stock'];

export default AllegroListingCrawler;
export {AllegroListingCrawler};
