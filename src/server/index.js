import es6Promise from 'es6Promise';
import injector from 'shared/injector/in-module';
import 'server/app/in-module';

es6Promise.polyfill();

const app = injector.instantiate('app');
app.run();
