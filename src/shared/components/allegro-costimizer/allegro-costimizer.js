import _ from "lodash";

class AllegroCostimizer {
    costimizeSearch(searchSets) {
        let sellerIdsList = _.map(searchSets, (searchSet) => _.map(searchSet.items, (item) => item.seller.id));
        let commonSellerIds = _.intersection(...sellerIdsList);
        let results = _.map(commonSellerIds, (commonSellerId) => {
            let seller = _.find(searchSets[0].items, (item) => item.seller.id === commonSellerId).seller;
            let id = seller.id;
            let offers = _.map(searchSets, (searchSet) => {
                let query = searchSet.query;
                let items = _.filter(searchSet.items, (item) => item.seller.id === commonSellerId);
                let prices = {
                    minimum: _.min(items, (item) => item.price).price,
                    maximum: _.max(items, (item) => item.price).price,
                    average: this._sanitizePrice(_.sum(items, (item) => item.price) / items.length)
                };

                return {query, items, prices};
            });

            return {id, seller, offers};
        });

        return Promise.resolve(results);
    }

    _sanitizePrice(rawPrice) {
        return Number(Number(rawPrice).toFixed(2));
    }
}

AllegroCostimizer.factory = (...args) => new AllegroCostimizer(...args);
AllegroCostimizer.factory.$inject = [];

export default AllegroCostimizer;
export {AllegroCostimizer};
