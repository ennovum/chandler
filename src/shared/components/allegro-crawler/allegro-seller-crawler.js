import _ from "lodash";

class AllegroSellerCrawler {
    constructor(config, fetcher, stock) {
        this._config = config;
        this._fetcher = fetcher;
        this._stock = stock;
    }

    getListingOfferSeller(id) {
        let url = `http://allegro.pl/show_user.php?uid=${id}`;

        let seller = {id, name: null, rating: null, url};

        return this._fetchListingOfferSellerData(id)
            .then((data) => {
                let login = _.get(data, 'login', `? (${id})`);

                seller.name = `Allegro / ${login}`;
                seller.rating = data.rating;
            })
            .then(() => seller);
    }

    _fetchListingOfferSellerData(id) {
        return this._stock.have(
            `listingOfferSellerData/${id}`,
            () => this._fetcher.fetchJSON(this._config.api.resources.allegro.listingUserData(id)));
    }
}

AllegroSellerCrawler.service = (...args) => new AllegroSellerCrawler(...args);
AllegroSellerCrawler.service.$inject = ['config', 'fetcher', 'stock'];

export default AllegroSellerCrawler;
export {AllegroSellerCrawler};
