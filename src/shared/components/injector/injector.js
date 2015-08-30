import _ from "lodash";

class Injector {
    constructor() {
        this._map = {};
    }

    set(name, instance) {
        this._map[name] = instance;
    }

    get(name) {
        return this._map[name];
    }

    instantiate(name, factory) {
        let dependencies = factory.$inject || [];
        let instance = factory.apply(null, _.map(dependencies, (dependency) => this.get(dependency)));
        this.set(name, instance);
    }
}

let injector = new Injector();

export default injector;
