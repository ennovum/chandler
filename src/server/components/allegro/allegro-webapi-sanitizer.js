import _ from "lodash";

class AllegroSanitizer {
    sanitizeSearchResult(searchResult) {
        return this._sanitizeItems(searchResult.data)
            .then((data) => {
                searchResult.data = data;
                return searchResult;
            });
    }

    _sanitizeItems(items) {
        return Promise.all(_.map(items, (item) => this._sanitizeItem(item)));
    }

    _sanitizeItem(item) {
        return Promise.resolve({
            id: item.itemId,
            title: item.itemTitle,
            seller: {
                id: item.sellerInfo.userId,
                login: item.sellerInfo.userLogin,
                rating: item.sellerInfo.userRating
            },
            price: _.reduce(item.priceInfo.item, (price, priceItem) => _.min([priceItem.priceValue, price]), Infinity),
            photos: _.map(_.filter(item.photosInfo.item, (photosInfoItem) => photosInfoItem.photoSize === "small"), (photosInfoItem) => photosInfoItem.photoUrl)
        });
    }
}

AllegroSanitizer.factory = () => new AllegroSanitizer();
AllegroSanitizer.factory.$inject = [];

export default AllegroSanitizer;
