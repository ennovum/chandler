import _ from 'lodash';

import VendorSale from './../sale/vendor-sale.js';

class CeneoSale extends VendorSale {
    constructor(ceneoListingCrawler, costimizer) {
        super(costimizer);

        this._ceneoListingCrawler = ceneoListingCrawler;
    }

    _sipListing(searchSet, handleSip) {
        return this._ceneoListingCrawler.sipListing(searchSet.query, handleSip);
    }
}

CeneoSale.service = (...args) => new CeneoSale(...args);
CeneoSale.service.$inject = ['ceneoListingCrawler', 'costimizer'];

export default CeneoSale;
export {CeneoSale};
