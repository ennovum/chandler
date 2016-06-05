import _ from "lodash";

import VendorSale from "./vendor-sale.js";

class CeneoSale extends VendorSale {
    constructor(ceneoListingCrawler, costimizer) {
        super(costimizer);

        this._ceneoListingCrawler = ceneoListingCrawler;
    }

    _sipListing(searchSet, handleSip) {
        return this._ceneoListingCrawler.sipListing(searchSet.query, (result) => {
            searchSet.items = searchSet.items.concat(result.data.offers);

            return handleSip(searchSet);
        });
    }
}

CeneoSale.service = (...args) => new CeneoSale(...args);
CeneoSale.service.$inject = ["ceneoListingCrawler", "costimizer"];

export default CeneoSale;
export {CeneoSale};
