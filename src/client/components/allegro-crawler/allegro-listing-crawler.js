import config from "./../../config/config.js";

class AllegroListingCrawler {
    constructor(fetcher, crawebler) {
        this._fetcher = fetcher;
        this._crawebler = crawebler;
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
                    done(result, false);
                    return this._sipListingTail(query, page + 1, done, checkAborted);
                }
                else {
                    done(result, true);
                }
            });
    }

    _getListingPage(query, page) {
        return this._fetcher.fetchText(config.api.resources.allegro.listing(query, page))
            .then((source) => this._parseListingSource(query, page, source));
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
        let prices = [
            offerCrEl.element('.offer-price .statement').text()
        ];
        let url = `http://allegro.pl/show_item.php?item=${id}`;
        let photoUrls = JSON.parse(offerCrEl.element('.offer-photo').attribute('data-photo-urls'));

        let offer = {id, title, prices, seller: null, url, photoUrls};

        return this._digListingOfferSeller(offerCrEl)
            .then((seller) => offer.seller = seller)
            .then(() => offer);
    }

    _digListingOfferSeller(offerCrEl) {
        let id = offerCrEl.element('.offer-info').attribute('data-seller-id');
        let url = `http://allegro.pl/show_user.php?uid=${id}`;

        let seller = {id, login: null, rating: null, url};

        return this._fetcher.fetchJSON(config.api.resources.allegro.listingUserData(id))
            .then((data) => {
                seller.login = data.login;
                seller.rating = data.rating;
            })
            .then(() => seller);
    }
}

AllegroListingCrawler.service = (...args) => new AllegroListingCrawler(...args);
AllegroListingCrawler.service.$inject = ['fetcher', 'crawebler'];

export default AllegroListingCrawler;
export {AllegroListingCrawler};
