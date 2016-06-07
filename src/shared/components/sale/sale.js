import AllegroSale from "./allegro-sale.js";
import CeneoSale from "./ceneo-sale.js";

class Sale {
	constructor(allegroSale, ceneoSale) {
		this._allegroSale = allegroSale;
		this._ceneoSale = ceneoSale;
	}

	sipSale(queries, handleSip) {
		let allegroSale = {results: [], progress: 0};
		let ceneoSale = {results: [], progress: 0};
		let combinedSale = {results: [], progress: 0};

		let allegroPromise = this._allegroSale.sipSale(queries, (sale) => {
			allegroSale = sale;

			combinedSale.results = [].concat(allegroSale.results, ceneoSale.results);
			combinedSale.progress = (allegroSale.progress + ceneoSale.progress) / 2;

			handleSip(combinedSale);
		});
		let ceneoPromise = this._ceneoSale.sipSale(queries, (sale) => {
			ceneoSale = sale;

			combinedSale.results = [].concat(allegroSale.results, ceneoSale.results);
			combinedSale.progress = (allegroSale.progress + ceneoSale.progress) / 2;

			handleSip(combinedSale);
		});

		let promise = Promise.all([allegroPromise, ceneoPromise])
			.then(() => combinedSale);

		promise.abort = () => {
			allegroPromise.abort();
			ceneoPromise.abort();
		};

		return promise;
	}
}

Sale.service = (...args) => new Sale(...args);
Sale.service.$inject = ["allegroSale", "ceneoSale"];

export default {Sale, AllegroSale, CeneoSale};
export {Sale, AllegroSale, CeneoSale};
