import angular from 'angular';
import 'angularRoute';
import 'shared/conf/ng-module';
import 'shared/i18n/ng-module';
import 'webui/costimizer-ui/ng-module';

import config from './config';
import run from './run';

angular
    .module('app', ['ngRoute', 'conf', 'i18n', 'costimizerUi'])
    .config(config)
    .run(run);
