import _ from 'lodash';

class Costimizer {
    costimizeSearch(searchSets) {
        let sellerIdsSets = _.map(searchSets, (searchSet) => _.map(searchSet.items, (item) => item.seller.id));
        let commonSellerIds = _.intersection(...sellerIdsSets);
        let results = this._evalResults(searchSets, commonSellerIds);

        return Promise.resolve(results);
    }

    _evalResults(searchSets, sellerIds) {
        let results = _.map(sellerIds, (sellerId) => {
            let seller = this._evalSeller(searchSets, sellerId);
            let id = seller.id;
            let offers = this._evalOffers(searchSets, sellerId);

            return {id, seller, offers};
        });

        return results;
    }

    _evalSeller(searchSets, sellerId) {
        let seller = _.find(searchSets[0].items, (item) => item.seller.id === sellerId).seller;

        return seller;
    }

    _evalOffers(searchSets, sellerId) {
        let offers = _.map(searchSets, (searchSet) => this._evalOffer(searchSet, sellerId));

        return offers;
    }

    _evalOffer(searchSet, sellerId) {
        let query = searchSet.query;
        let items = _.filter(searchSet.items, (item) => item.seller.id === sellerId);
        let prices = this._evalOfferPrices(items);

        return {query, items, prices};
    }

    _evalOfferPrices(offerItems) {
        let itemsGroups = _.groupBy(offerItems, (item) => item.price.currency);
        let prices = _.map(itemsGroups, (items) => {
            let minimum = _.min(items, (item) => item.price.value).price.value;
            let maximum = _.max(items, (item) => item.price.value).price.value;
            let average = this._sanitizePrice(_.sumBy(items, (item) => item.price.value) / items.length);
            let currency = items[0].price.currency;

            return {minimum, maximum, average, currency};
        });

        return prices;
    }

    _sanitizePrice(rawPrice) {
        return Number(Number(rawPrice).toFixed(2));
    }
}

Costimizer.factory = (...args) => new Costimizer(...args);
Costimizer.factory.$inject = [];

export default Costimizer;
export {Costimizer};
