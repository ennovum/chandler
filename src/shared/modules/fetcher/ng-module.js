import angular from 'angular';

import Fetcher from './fetcher';

angular
    .module('fetcher', [])
    .service('fetcher', Fetcher.factory);
