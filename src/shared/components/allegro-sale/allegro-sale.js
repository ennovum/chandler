import _ from "lodash";

import AbstractSale from "./../abstract-sale/abstract-sale.js";

class AllegroSale extends AbstractSale {
    constructor(allegroListingCrawler, allegroSellerCrawler, costimizer) {
        super(costimizer);

        this._allegroListingCrawler = allegroListingCrawler;
        this._allegroSellerCrawler = allegroSellerCrawler;
    }

    _sipListing(searchSet, handleSip) {
        return this._allegroListingCrawler.sipListing(searchSet.query, (result) => {
            searchSet.items = searchSet.items.concat(result.data.offers);

            return handleSip(searchSet);
        });
    }

    _decorateResults(results) {
        let sellerPromises = _.map(results, (result) => {
            return this._getSeller(result)
                .then((seller) => result.seller = seller);
        });

        return Promise.all(sellerPromises)
            .then(() => results);
    }

    _getSeller(result) {
        return this._allegroSellerCrawler.getListingOfferSeller(result.seller.id);
    }
}

AllegroSale.service = (...args) => new AllegroSale(...args);
AllegroSale.service.$inject = ["allegroListingCrawler", "allegroSellerCrawler", "costimizer"];

export default AllegroSale;
export {AllegroSale};
