import AllegroSale from "./allegro-sale.js";
import CeneoSale from "./ceneo-sale.js";

class Sale {
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

	sipSale(queries, handleSip) {
		let vendors = _.map(this._vendors, (vendor) => {
			let id = vendor.id;
			let saleService = vendor.saleService;
			let sale = {results: [], progress: 0};
			let promise = null;

			return {id, saleService, sale, promise};
		});

		let combinedSale = {results: [], progress: 0};

		let handleVendorSip = (vendor, sale) => {
			vendor.sale = sale;

			combinedSale.results = _.reduce(vendors, (results, vendor) => results.concat(vendor.sale.results), []);
			combinedSale.progress = _.sum(vendors, (vendor) => vendor.sale.progress) / vendors.length;

			handleSip(combinedSale);
		};

		_.forEach(vendors, (vendor) => {
			vendor.promise = vendor.saleService.sipSale(queries, (sale) => handleVendorSip(vendor, sale));
		});

		let promise = Promise.all(_.map(vendors, (vendor) => vendor.promise))
			.then(() => combinedSale);

		promise.abort = () => {
			_.forEach(vendors, (vendor) => vendor.promise.abort());
		};

		return promise;
	}
}

Sale.service = (...args) => new Sale(...args);
Sale.service.$inject = ["allegroSale", "ceneoSale"];

export default {Sale, AllegroSale, CeneoSale};
export {Sale, AllegroSale, CeneoSale};
