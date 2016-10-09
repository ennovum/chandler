import angular from 'angular';
import 'shared/sale-mix/ng-module';
import 'shared/debouncer/ng-module';
import 'shared/loading/ng-module';
import 'shared/keyboard/ng-module';
import 'shared/price/ng-module';
import 'shared/input/ng-module';
import 'shared/trust/ng-module';
import 'shared/i18n/ng-module';

import CostimizerUiComponent from './costimizer-ui-component';
import CostimizerUiIntroComponent from './modules/intro/costimizer-ui-intro-component';
import CostimizerUiQueriesComponent from './modules/queries/costimizer-ui-queries-component';
import CostimizerUiResultsComponent from './modules/results/costimizer-ui-results-component';

angular
    .module('costimizerUi', ['saleMix', 'debouncer', 'loading', 'keyboard', 'price', 'input', 'trust', 'i18n'])
    .component('costimizerUi', CostimizerUiComponent.component)
    .component('costimizerUiIntro', CostimizerUiIntroComponent.component)
    .component('costimizerUiQueries', CostimizerUiQueriesComponent.component)
    .component('costimizerUiResults', CostimizerUiResultsComponent.component);
