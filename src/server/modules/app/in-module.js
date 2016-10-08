import injector from 'shared/injector/in-module';
import App from './app';

injector.register('app', App.factory);
