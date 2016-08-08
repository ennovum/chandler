import conf from 'conf';

import {
    ProxyHandler
} from 'proxy-handler/proxy-handler.js';

import {
    Fetcher
} from 'fetcher/fetcher.js';

function depend(injector) {
    injector.set('conf', conf);
    injector.register('proxyHandler', ProxyHandler.factory);
    injector.register('fetcher', Fetcher.factory);
}

export default depend;
export {depend};
