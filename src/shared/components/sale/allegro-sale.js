import _ from 'lodash';

import VendorSale from './vendor-sale.js';

class AllegroSale extends VendorSale {
    constructor(allegroListingCrawler, allegroSellerCrawler, costimizer) {
        super(costimizer);

        this._allegroListingCrawler = allegroListingCrawler;
        this._allegroSellerCrawler = allegroSellerCrawler;
    }

    _sipListing(searchSet, handleSip) {
        return this._allegroListingCrawler.sipListing(searchSet.query, (result) => {
            searchSet.items = searchSet.items.concat(result.data.offers);
            searchSet.progress = (result.meta.page + 1) / result.meta.pageCount;

            return handleSip(searchSet);
        });
    }

    _decorateSale(sale) {
        let sellerPromises = _.map(sale.results, (result) => {
            return this._getSeller(result)
                .then((seller) => result.seller = seller);
        });

        return Promise.all(sellerPromises)
            .then(() => sale);
    }

    _getSeller(result) {
        return this._allegroSellerCrawler.getListingOfferSeller(result.seller.id);
    }
}

AllegroSale.service = (...args) => new AllegroSale(...args);
AllegroSale.service.$inject = ['allegroListingCrawler', 'allegroSellerCrawler', 'costimizer'];

export default AllegroSale;
export {AllegroSale};
