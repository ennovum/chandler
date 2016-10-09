import get from 'lodash/get';
import conf from 'conf';

class Conf {
    get(path, alt) {
        return get(conf, path, alt);
    }
}

Conf.service = (...args) => new Conf(...args);
Conf.service.$inject = [];

export default Conf;
export {Conf};
