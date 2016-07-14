const ERROR_CODE_REINSTANTIATION = 1;
const ERROR_CODE_DEPENDENCY_LOOP = 2;
const ERROR_CODE_NO_FACTORY = 3;

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
        let instance = injectable.instance;

        if (!instance) {
            instance = this.instantiate(name);
        }

        return instance;
    }

    register(name, factory) {
        this._injectables[name] = {factory};
    }

    instantiate(name) {
        let injectable = this._injectables[name] || {};

        if (injectable.instance) {
            throw new Error(`Injector error ${ERROR_CODE_REINSTANTIATION}: Attepting to instantiate already instantiated injectable (${name}).`);
        }

        if (injectable.instantiated && !injectable.instance) {
            throw new Error(`Injector error ${ERROR_CODE_DEPENDENCY_LOOP}: Circular dependency chain (${name}).`);
        }

        let factory = injectable.factory;
        if (!factory) {
            throw new Error(`Injector error ${ERROR_CODE_NO_FACTORY}: Attepting to instantiate not registered injectable (${name}).`);
        }

        injectable.instantiated = true;

        let names = factory.$inject || [];
        let dependencies = names.map((name) => this.get(name));
        let instance = factory(...dependencies);

        this.set(name, instance);

        return instance;
    }
}

export default Injector;
export {Injector};
