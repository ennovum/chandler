import VendorSale from 'sale/vendor-sale';

class CeneoSale extends VendorSale {
    constructor(ceneoCategoryCrawler, ceneoListingCrawler, costimizer) {
        super(costimizer);

        this._ceneoCategoryCrawler = ceneoCategoryCrawler;
        this._ceneoListingCrawler = ceneoListingCrawler;
    }

    getCategoryMap() {
        return this._ceneoCategoryCrawler.getCategoryMap();
    }

    getListingPage(query, page) {
        return this._ceneoListingCrawler.getListingPage(query, page);
    }
}

CeneoSale.service = (...args) => new CeneoSale(...args);
CeneoSale.service.$inject = ['ceneoCategoryCrawler', 'ceneoListingCrawler', 'costimizer'];

export default CeneoSale;
export {CeneoSale};
