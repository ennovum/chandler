import _ from "lodash";

export default class AllegroSanitizer {
    sanitizeSearchResult(searchResult) {
        searchResult.data = this._sanitizeItems(searchResult.data);
        return searchResult;
    }

    _sanitizeItems(items) {
        return _.map(items, (item) => this._sanitizeItem(item));
    }

    _sanitizeItem(item) {
        let id = _.get(item, "itemId", null);
        let title = _.get(item, "itemTitle", null);
        let url = `http://allegro.pl/show_item.php?item=${id}`;

        let sellerInfo = _.get(item, "sellerInfo", null);
        let seller = this._sanitizeSellerInfo(sellerInfo);

        let priceItems = _.get(item, "priceInfo.item", null);
        let prices = _.map(priceItems, (priceItem) => priceItem.priceValue);

        let photosInfoItems = _.get(item, "photosInfo.item", null);
        let photoUrls = _.map(_.filter(photosInfoItems, (photosInfoItem) => photosInfoItem.photoSize === "small"), (photosInfoItem) => photosInfoItem.photoUrl);

        return {id, title, seller, prices, url, photoUrls};
    }

    _sanitizeSellerInfo(sellerInfo) {
        let id = _.get(sellerInfo, "userId", null);
        let login = _.get(sellerInfo, "userLogin", null);
        let rating = _.get(sellerInfo, "userRating", null);
        let url = `http://allegro.pl/show_user.php?uid=${id}`;

        return {id, login, rating, url};
    }
}

AllegroSanitizer.factory = () => new AllegroSanitizer();
AllegroSanitizer.factory.$inject = [];
