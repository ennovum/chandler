import conf from 'conf';

import {
    ProxyHandler
} from './../modules/proxy-handler/proxy-handler.js';

import {
    Fetcher
} from './../../shared/modules/fetcher/fetcher.js';

function depend(injector) {
    injector.set('conf', conf);
    injector.register('proxyHandler', ProxyHandler.factory);
    injector.register('fetcher', Fetcher.factory);
}

export default depend;
export {depend};
