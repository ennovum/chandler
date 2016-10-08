import forEach from 'lodash/forEach';

import routing from './routing';

function config($routeProvider) {
    forEach(routing.routes, (route, path) => $routeProvider.when(path, route));

    $routeProvider.otherwise({
        redirectTo: routing.defaultPath
    });
}
config.$inject = ['$routeProvider'];

export default config;
export {config};
