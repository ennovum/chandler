import config from "./../../config/config.js";

class AllegroSellerCrawler {
    constructor(fetcher, crawebler) {
        this._fetcher = fetcher;
        this._crawebler = crawebler;
    }

    getListingOfferSeller(id) {
        let url = `http://allegro.pl/show_user.php?uid=${id}`;

        let seller = {id, login: null, rating: null, url};

        return this._fetcher.fetchJSON(config.api.resources.allegro.listingUserData(id))
            .then((data) => {
                seller.login = data.login;
                seller.rating = data.rating;
            })
            .then(() => seller);
    }
}

AllegroSellerCrawler.service = (...args) => new AllegroSellerCrawler(...args);
AllegroSellerCrawler.service.$inject = ['fetcher', 'crawebler'];

export default AllegroSellerCrawler;
export {AllegroSellerCrawler};
