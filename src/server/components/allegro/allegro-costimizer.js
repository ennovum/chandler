import _ from "lodash";

class AllegroCostimizer {
    costimize(itemsSet) {
        let sellersSet = _.map(itemsSet, (items) => _.map(items, (item) => item.sellerInfo.userId));
        let sellers = _.intersection.apply(null, sellersSet);

        // TODO

        return Promise.resolve(null);
    }
}

AllegroCostimizer.factory = () => new AllegroCostimizer();
AllegroCostimizer.factory.$inject = [];

export default AllegroCostimizer;
