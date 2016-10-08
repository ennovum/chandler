import conf from 'conf';

import {
    ProxyHandler
} from 'proxy-handler/proxy-handler';

import {
    Fetcher
} from 'fetcher/fetcher';

function depend(injector) {
    injector.set('conf', conf);
    injector.register('proxyHandler', ProxyHandler.factory);
    injector.register('fetcher', Fetcher.factory);
}

export default depend;
export {depend};
