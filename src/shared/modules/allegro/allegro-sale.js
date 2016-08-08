import _ from 'lodash';
import VendorSale from 'sale/vendor-sale.js';

class AllegroSale extends VendorSale {
    constructor(allegroListingCrawler, allegroSellerCrawler, costimizer) {
        super(costimizer);

        this._allegroListingCrawler = allegroListingCrawler;
        this._allegroSellerCrawler = allegroSellerCrawler;
    }

    _fetchListingPage(query, page) {
        return this._allegroListingCrawler.getListingPage(query, page);
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
