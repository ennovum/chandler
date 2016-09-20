import _ from 'lodash';
import VendorCategoryCrawler from 'crawler/vendor-category-crawler.js';

class CeneoCategoryCrawler extends VendorCategoryCrawler {
    constructor(ceneoLinker, fetcher, crawebler, stock) {
        super(crawebler);

        this._ceneoLinker = ceneoLinker;
        this._fetcher = fetcher;
        this._stock = stock;
    }

    _fetchCategoryMapSource() {
        let url = this._ceneoLinker.getCategoryMapURL();

        return this._stock.have(
            `ceneo/categories`,
            () => this._fetcher.fetchText(url));
    }

    _findCategories(categoryMapCrDoc) {
        let categoryCrColl = categoryMapCrDoc.collection('.category-map dt a');

        return Promise.resolve(categoryCrColl);
    }

    _digCategory(categoryCrEl) {
        let id = categoryCrEl.attribute('href').replace('/', '');
        let name = _.trim(categoryCrEl.text(), ' ()0123456789');

        let category = {id, name};

        return Promise.resolve(category);
    }
}

CeneoCategoryCrawler.service = (...args) => new CeneoCategoryCrawler(...args);
CeneoCategoryCrawler.service.$inject = ['ceneoLinker', 'fetcher', 'crawebler', 'stock'];

export default CeneoCategoryCrawler;
export {CeneoCategoryCrawler};
