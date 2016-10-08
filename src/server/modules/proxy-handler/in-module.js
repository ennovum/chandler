import injector from 'shared/injector/in-module';
import 'shared/fetcher/in-module';

import ProxyHandler from './proxy-handler';

injector.register('proxyHandler', ProxyHandler.factory);
