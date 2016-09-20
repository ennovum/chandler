import _ from 'lodash';

class AllegroLinker {
    constructor(conf) {
        this._conf = conf;
    }

    getCategoryMapDataURL() {
        let url = `http://allegro.pl/Utils/Category.php/getChildrens/category,0`;
        return this._decorateURL(url);
    }

    getListingURL(phrase, page) {
        let encodedPhrase = encodeURIComponent(phrase);
        let url = `http://allegro.pl/listing/listing.php?order=t&string=${encodedPhrase}&p=${page}`;
        return this._decorateURL(url);
    }

    getListingUserDataURL(userId) {
        let url = `http://allegro.pl/listing-user-data/users/${userId}`;
        return this._decorateURL(url);
    }

    _decorateURL(url) {
        let proxy = _.get(this._conf, 'api.proxy');
        if (proxy) {
            url = proxy(url);
        }

        return url;
    }
}

AllegroLinker.service = (...args) => new AllegroLinker(...args);
AllegroLinker.service.$inject = ['conf'];

export default AllegroLinker;
export {AllegroLinker};
