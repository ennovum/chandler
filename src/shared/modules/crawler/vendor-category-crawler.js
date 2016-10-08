import VendorCrawler from './vendor-crawler';

class VendorCategoryCrawler extends VendorCrawler {
    constructor(crawebler) {
        super(crawebler);
    }

    getCategoryMap() {
        let categoryMap = {categories: null};

        return this._fetchCategoryMapSource()
            .then((source) => this._parseSource(source))
            .then((categoryMapCrDoc) => this._findCategories(categoryMapCrDoc))
            .then((categoryCrColl) => this._digCategories(categoryCrColl))
            .then((categories) => categoryMap.categories = categories)
            .then(() => categoryMap);
    }

    _digCategories(categoryCrColl) {
        return Promise.all(categoryCrColl.map((categoryCrEl) => {
            let category;

            return this._digCategory(categoryCrEl)
                .then((_category) => category = _category)
                .then(() => category);
        }));
    }
}

VendorCategoryCrawler.service = (...args) => new VendorCategoryCrawler(...args);
VendorCategoryCrawler.service.$inject = ['crawebler'];

export default VendorCategoryCrawler;
export {VendorCategoryCrawler};
