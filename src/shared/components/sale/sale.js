import AllegroSale from "./allegro-sale.js";
import CeneoSale from "./ceneo-sale.js";

class Sale {
	constructor(allegroSale, ceneoSale) {
		this._allegroSale = allegroSale;
		this._ceneoSale = ceneoSale;
	}

	sipSale(queries, handleSip) {
		return this._allegroSale.sipSale(queries, handleSip);
	}
}

Sale.service = (...args) => new Sale(...args);
Sale.service.$inject = ["allegroSale", "ceneoSale"];

export default {Sale, AllegroSale, CeneoSale};
export {Sale, AllegroSale, CeneoSale};
