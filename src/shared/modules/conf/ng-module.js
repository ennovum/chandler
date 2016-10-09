import angular from 'angular';

import Conf from './conf';

angular
    .module('conf', [])
    .service('conf', Conf.service);
