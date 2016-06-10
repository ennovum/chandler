import _ from 'lodash';

class AllegroSellerCrawler {
    constructor(config, fetcher, stock) {
        this._config = config;
        this._fetcher = fetcher;
        this._stock = stock;
    }

    getListingOfferSeller(id) {
        return this._fetchListingOfferSellerData(id)
            .then((listingOfferSellerData) => this._digListingOfferSeller(listingOfferSellerData));
    }

    _fetchListingOfferSellerData(id) {
        return this._stock.have(
            `allegro/listingOfferSellerData/${id}`,
            () => this._fetcher.fetchJSON(this._config.api.resources.allegro.listingUserData(id)));
    }

    _digListingOfferSeller(listingOfferSellerData) {
        let id = listingOfferSellerData.id;
        let name = _.get(listingOfferSellerData, 'login', `? (${id})`);
        let rating = listingOfferSellerData.rating;
        let url = `http://allegro.pl/show_user.php?uid=${id}`;

        name = `allegro.pl / ${name}`;

        let seller = {id, name, rating, url};

        return Promise.resolve(seller);
    }
}

AllegroSellerCrawler.service = (...args) => new AllegroSellerCrawler(...args);
AllegroSellerCrawler.service.$inject = ['config', 'fetcher', 'stock'];

export default AllegroSellerCrawler;
export {AllegroSellerCrawler};
