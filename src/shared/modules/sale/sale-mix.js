import _ from 'lodash';

class SaleMix {
	constructor(allegroSale, ceneoSale) {
		this._allegroSale = allegroSale;
		this._ceneoSale = ceneoSale;

		this._vendors = [
			{
				id: 'allegro',
				saleService: this._allegroSale
			},
			{
				id: 'ceneo',
				saleService: this._ceneoSale
			}
		];
	}

	sipSaleMix(vendorIds, queries, handleSip) {
		let vendors = _.map(vendorIds, (vendorId) => {
			let vendor = _.find(this._vendors, (vendor) => vendor.id === vendorId);

			let id = vendor.id;
			let saleService = vendor.saleService;
			let sale = {results: [], progress: 0};
			let promise = null;

			return {id, saleService, sale, promise};
		});

		let saleMix = {results: [], progress: 0};

		let handleVendorSip = (vendor, vendorSale) => {
			vendor.sale = vendorSale;

			saleMix.results = _.reduce(vendors, (results, vendor) => results.concat(vendor.sale.results), []);
			saleMix.progress = _.sumBy(vendors, (vendor) => vendor.sale.progress) / vendors.length;

			handleSip(saleMix);
		};

		_.forEach(vendors, (vendor) => {
			vendor.promise = vendor.saleService.sipSale(queries, (sale) => handleVendorSip(vendor, sale));
		});

		let promise = Promise.all(_.map(vendors, (vendor) => vendor.promise))
			.then(() => saleMix);

		promise.abort = () => {
			_.forEach(vendors, (vendor) => vendor.promise.abort());
		};

		return promise;
	}
}

SaleMix.service = (...args) => new SaleMix(...args);
SaleMix.service.$inject = ['allegroSale', 'ceneoSale'];

export default SaleMix;
export {SaleMix};
