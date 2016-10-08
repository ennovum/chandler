import es6Promise from 'es6Promise';
import angular from 'angular';
import 'webui/app/ng-module';

es6Promise.polyfill();

window.addEventListener('load', () => {
    angular.bootstrap(document, ['app']);
});
