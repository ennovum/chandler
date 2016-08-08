import VendorSale from 'sale/vendor-sale.js';

class CeneoSale extends VendorSale {
    constructor(ceneoListingCrawler, costimizer) {
        super(costimizer);

        this._ceneoListingCrawler = ceneoListingCrawler;
    }

    _fetchListingPage(query, page) {
        return this._ceneoListingCrawler.getListingPage(query, page);
    }
}

CeneoSale.service = (...args) => new CeneoSale(...args);
CeneoSale.service.$inject = ['ceneoListingCrawler', 'costimizer'];

export default CeneoSale;
export {CeneoSale};
