import _ from 'lodash';

class SaleMix {
    constructor() {
        this._vendors = [];
    }

    registerVendor(id, saleService) {
        this._vendors.push({id, saleService})
    }

    getCategoryMaps(vendorIds) {
        let vendors = this._evalVendors(vendorIds);
        let items = _.map(vendors, (vendor) => ({
            vendor,
            promise: null
        }));

        _.forEach(items, (item) => {
            item.promise = item.vendor.saleService.getCategoryMap().then((categoryMap) => ({
                vendorId: item.vendor.id,
                categoryMap
            }));
        });

        let promises = _.map(items, (item) => item.promise);
        let promise = Promise.all(promises);

        return promise;
    }

    sipSaleMix(vendorIds, queries, handleSip) {
        let vendors = this._evalVendors(vendorIds);
        let items = _.map(vendors, (vendor) => ({
            vendor,
            sale: {results: [], progress: 0},
            promise: null
        }));

        let saleMix = {results: [], progress: 0};

        let handleVendorSip = (item, sale) => {
            item.sale = sale;

            saleMix.results = _.reduce(items, (results, item) => results.concat(item.sale.results), []);
            saleMix.progress = _.sumBy(items, (item) => item.sale.progress) / items.length;

            handleSip(saleMix);
        };

        _.forEach(items, (item) => {
            item.promise = item.vendor.saleService.sipSale(queries, (sale) => handleVendorSip(item, sale));
        });

        let promises = _.map(items, (item) => item.promise);
        let promise = Promise.all(promises).then(() => saleMix);

        promise.abort = () => {
            _.forEach(items, (item) => item.promise.abort());
        };

        return promise;
    }

    _evalVendors(vendorIds) {
        let vendors = _.map(vendorIds, (vendorId) => {
            let vendor = _.find(this._vendors, (vendor) => vendor.id === vendorId);

            let id = vendor.id;
            let saleService = vendor.saleService;

            return {id, saleService};
        });

        return vendors;
    }
}

SaleMix.service = (...args) => new SaleMix(...args);
SaleMix.service.$inject = [];

export default SaleMix;
export {SaleMix};
