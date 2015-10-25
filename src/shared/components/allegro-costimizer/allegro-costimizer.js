import _ from "lodash";

class AllegroCostimizer {
    costimizeSearch(searchSets) {
        let sellerIdsList = _.map(searchSets, (searchSet) => _.map(searchSet.items, (item) => item.seller.id));
        let commonSellerIds = _.intersection(...sellerIdsList);
        let results = _.map(commonSellerIds, (commonSellerId) => {
            let seller = _.find(searchSets[0].items, (item) => item.seller.id === commonSellerId).seller;
            let offers = _.map(searchSets, (searchSet) => ({
                query: searchSet.query,
                items: _.filter(searchSet.items, (item) => item.seller.id === commonSellerId)
            }));

            return {seller, offers};
        });

        return Promise.resolve(results);
    }
}

AllegroCostimizer.factory = (...args) => new AllegroCostimizer(...args);
AllegroCostimizer.factory.$inject = [];

export default AllegroCostimizer;
export {AllegroCostimizer};
