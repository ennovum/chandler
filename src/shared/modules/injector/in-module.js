import Injector from './injector';

const injector = new Injector();

injector.set('injector', injector);

export default injector;
export {injector};
