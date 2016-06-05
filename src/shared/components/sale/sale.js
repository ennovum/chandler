import AllegroSale from "./allegro-sale.js";
import CeneoSale from "./ceneo-sale.js";

class Sale {
	constructor(allegroSale, ceneoSale) {
		this._allegroSale = allegroSale;
		this._ceneoSale = ceneoSale;
	}

	sipSale(queries, handleSip) {
		let allegroResults = [];
		let ceneoResults = [];
		let results;

		let allegroPromise = this._allegroSale.sipSale(queries, (results) => {
			allegroResults = results;
			results = [].concat(allegroResults, ceneoResults);
			handleSip(results);
		});
		let ceneoPromise = this._ceneoSale.sipSale(queries, (results) => {
			ceneoResults = results;
			results = [].concat(allegroResults, ceneoResults);
			handleSip(results);
		});

		let promise = Promise.all([allegroPromise, ceneoPromise])
			.then(() => results);

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
