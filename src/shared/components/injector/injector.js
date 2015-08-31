import _ from "lodash";

class Injector {
    constructor() {
        this._injectables = {};
    }

    set(name, instance) {
        let injectable = this._injectables[name] || {};
        injectable.instance = instance;
        this._injectables[name] = injectable;
    }

    get(name) {
        let injectable = this._injectables[name] || {};
        injectable.instance || (injectable.factory && (this.instantiate(name, injectable.factory)));
        return injectable.instance;
    }

    register(name, factory) {
        this._injectables[name] = {factory};
    }

    instantiate(name, factory) {
        let dependencies = factory.$inject || [];
        let instance = factory.apply(null, _.map(dependencies, (dependency) => this.get(dependency)));
        this.set(name, instance);
    }
}

let injector = new Injector();

export default injector;
