import _ from "lodash";

class AllegroSellerCrawler {
    constructor(config, fetcher, stock) {
        this._config = config;
        this._fetcher = fetcher;
        this._stock = stock;
    }

    getListingOfferSeller(id) {
        return this._fetchListingOfferSellerData(id)
            .then((data) => this._parseListingOfferSellerData(data));
    }

    _fetchListingOfferSellerData(id) {
        return this._stock.have(
            `allegro/listingOfferSellerData/${id}`,
            () => this._fetcher.fetchJSON(this._config.api.resources.allegro.listingUserData(id)));
    }

    _parseListingOfferSellerData(data) {
        let id = data.id;
        let login = _.get(data, 'login', `? (${id})`);
        let name = `Allegro / ${login}`;
        let rating = data.rating;
        let url = `http://allegro.pl/show_user.php?uid=${id}`;

        let seller = {id, name, rating, url};

        return Promise.resolve(seller);
    }
}

AllegroSellerCrawler.service = (...args) => new AllegroSellerCrawler(...args);
AllegroSellerCrawler.service.$inject = ['config', 'fetcher', 'stock'];

export default AllegroSellerCrawler;
export {AllegroSellerCrawler};
