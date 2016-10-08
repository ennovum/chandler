import injector from 'shared/injector/in-module';

import Fetcher from './fetcher';

injector.register('fetcher', Fetcher.factory);
