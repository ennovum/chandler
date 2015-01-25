let _ = require("lodash");

class Injector {
    constructor() {
        this._map = {};
    }

    register(name, instance) {
        this._map[name] = instance;
    }

    instantiate(name, factory) {
        let dependencies = factory.$inject || [];
        let instance = factory.apply(null, _.map(dependencies, (dependency) => this.get(dependency)));
        this._map[name] = instance;
    }

    get(name) {
        return this._map[name];
    }
}

let injector = new Injector();

export default injector;
