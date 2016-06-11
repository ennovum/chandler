import _ from 'lodash';

class AllegroLinker {
    constructor(config) {
        this._config = config;
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
        let proxy = _.get(this._config, 'api.allegro.proxy');
        if (proxy) {
            url = proxy(url);
        }

        return url;
    }
}

AllegroLinker.service = (...args) => new AllegroLinker(...args);
AllegroLinker.service.$inject = ['config'];

export default AllegroLinker;
export {AllegroLinker};
