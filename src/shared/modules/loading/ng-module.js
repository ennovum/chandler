import angular from 'angular';
import 'shared/i18n/ng-module';

import LoadingComponent from './loading-component';

angular
    .module('loading', ['i18n'])
    .component('loading', LoadingComponent.component);
