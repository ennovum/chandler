import angular from 'angular';
import 'shared/conf/ng-module';
import 'shared/fetcher/ng-module';
import 'shared/crawebler/ng-module';
import 'shared/stock/ng-module';
import 'shared/costimizer/ng-module';

import CeneoCategoryCrawler from './ceneo-category-crawler';
import CeneoListingCrawler from './ceneo-listing-crawler';
import CeneoLinker from './ceneo-linker';
import CeneoSale from './ceneo-sale';

angular
    .module('ceneo', ['conf', 'fetcher', 'crawebler', 'stock', 'costimizer'])
    .service('ceneoCategoryCrawler', CeneoCategoryCrawler.service)
    .service('ceneoListingCrawler', CeneoListingCrawler.service)
    .service('ceneoLinker', CeneoLinker.service)
    .service('ceneoSale', CeneoSale.service);
