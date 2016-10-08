import angular from 'angular';
import conf from 'conf';

angular
    .module('conf', [])
    .service('conf', () => conf);
