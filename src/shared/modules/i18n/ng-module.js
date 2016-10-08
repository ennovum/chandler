import angular from 'angular';

import I18n from './i18n';

angular
    .module('i18n', [])
    .service('i18n', I18n.service);
