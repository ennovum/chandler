import get from 'lodash/get';

class Conf {
    constructor() {
        this._conf = null;
    }

    setConf(conf) {
        this._conf = conf;
    }

    get(path, alt) {
        return get(this._conf, path, alt);
    }
}

Conf.service = (...args) => new Conf(...args);
Conf.service.$inject = [];

export default Conf;
export {Conf};
