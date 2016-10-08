import angular from 'angular';
import 'shared/conf/ng-module';
import 'shared/fetcher/ng-module';
import 'shared/crawebler/ng-module';
import 'shared/stock/ng-module';
import 'shared/costimizer/ng-module';

import AllegroCategoryCrawler from './allegro-category-crawler';
import AllegroListingCrawler from './allegro-listing-crawler';
import AllegroSellerCrawler from './allegro-seller-crawler';
import AllegroLinker from './allegro-linker';
import AllegroSale from './allegro-sale';

angular
    .module('allegro', ['conf', 'fetcher', 'crawebler', 'stock', 'costimizer'])
    .service('allegroCategoryCrawler', AllegroCategoryCrawler.service)
    .service('allegroListingCrawler', AllegroListingCrawler.service)
    .service('allegroSellerCrawler', AllegroSellerCrawler.service)
    .service('allegroLinker', AllegroLinker.service)
    .service('allegroSale', AllegroSale.service);
