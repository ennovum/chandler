import _ from "lodash";

class AllegroCostimizer {
    costimizeSearchResults(searchResults) {
        let sellerIds = _.intersection(...(_.map(searchResults, (searchResult) => _.map(searchResult.data, (item) => item.seller.id))));
        let result = {
            meta: {
                queries: _.map(searchResults, (searchResult) => searchResult.meta.query)
            },
            data: _.map(sellerIds, (sellerId) => {
                let seller = _.find(searchResults[0].data, (item) => item.seller.id === sellerId).seller;
                let offers = _.map(searchResults, (searchResult) => {
                    return {
                        query: searchResult.meta.query,
                        items: _.filter(searchResult.data, (item) => item.seller.id === sellerId)
                    };
                });

                return {seller, offers};
            })
        };

        return Promise.resolve(result);
    }
}

AllegroCostimizer.factory = (...args) => new AllegroCostimizer(...args);
AllegroCostimizer.factory.$inject = [];

export default AllegroCostimizer;
export {AllegroCostimizer};
