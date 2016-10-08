import _ from 'lodash';
import VendorCategoryCrawler from 'crawler/vendor-category-crawler';

class AllegroCategoryCrawler extends VendorCategoryCrawler {
    constructor(allegroLinker, fetcher, crawebler, stock) {
        super(crawebler);

        this._allegroLinker = allegroLinker;
        this._fetcher = fetcher;
        this._stock = stock;
    }

    getCategoryMap() {
        let categoryMap = {categories: null};

        return this._fetchCategoryMapData()
            .then((categoryMapData) => this._findCategories(categoryMapData))
            .then((categoryDataList) => this._digCategories(categoryDataList))
            .then((categories) => categoryMap.categories = categories)
            .then(() => categoryMap);
    }

    _fetchCategoryMapData() {
        let url = this._allegroLinker.getCategoryMapDataURL();

        return this._stock.have(
            `allegro/categories`,
            () => this._fetcher.fetchJSON(url));
    }

    _findCategories(categoryMapData) {
        let categoryDataList = categoryMapData.children;

        return Promise.resolve(categoryDataList);
    }

    _digCategories(categoryDataList) {
        return Promise.all(categoryDataList.map((categoryDataItem) => {
            let category;

            return this._digCategory(categoryDataItem)
                .then((_category) => category = _category)
                .then(() => category);
        }));
    }

    _digCategory(categoryDataItem) {
        let id = categoryDataItem.id;
        let name = categoryDataItem.name;

        let category = {id, name};

        return Promise.resolve(category);
    }
}

AllegroCategoryCrawler.service = (...args) => new AllegroCategoryCrawler(...args);
AllegroCategoryCrawler.service.$inject = ['allegroLinker', 'fetcher', 'crawebler', 'stock'];

export default AllegroCategoryCrawler;
export {AllegroCategoryCrawler};
