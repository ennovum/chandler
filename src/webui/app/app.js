import forEach from 'lodash/forEach';
import lang from 'lang';
import angular from 'angular';
import 'angularRoute';
import 'webui/costimizer-ui/ng-module';

import routing from './routing';

angular
    .module('app', [
        'ngRoute',
        'costimizerUi',
        'i18n'
    ])
    .config(['$routeProvider', ($routeProvider) => {
        forEach(routing.routes, (route, path) => $routeProvider.when(path, route));

        $routeProvider.otherwise({
            redirectTo: routing.defaultPath
        });
    }])
    .run(['i18n', (i18n) => {
        i18n.setLang(lang);
    }]);

class App {
    run() {
        angular.bootstrap(document, ['app']);
    }
}

export default App;
export {App};
