import AllegroSale from "./allegro-sale.js";

class Sale {
	constructor(allegroSale) {
		this._allegroSale = allegroSale;
	}

	sipSale(queries, handleSip) {
		return this._allegroSale.sipSale(queries, handleSip);
	}
}

Sale.service = (...args) => new Sale(...args);
Sale.service.$inject = ["allegroSale"];

export default {Sale, AllegroSale};
export {Sale, AllegroSale};
