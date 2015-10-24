/*global describe, it*/

import _ from "lodash";
import chai from "chai";

import Injector from "./injector.js";

let expect = chai.expect;

describe("Injector", () => {
    class Foo {
        constructor() {
            Foo.instances.push(this);
        }
    }
    Foo.instances = [];
    Foo.factory = (...args) => new Foo(...args);
    Foo.factory.$inject = [];

    it("should set an instance", () => {
        let injector = new Injector();
        let fooConstructedInstance = new Foo();

        injector.set("foo", fooConstructedInstance);

        let fooInjectableInstance = injector._injectables["foo"].instance;

        expect(fooInjectableInstance).to.equal(fooConstructedInstance);
    });

    it("should get a previously set instance", () => {
        let injector = new Injector();
        let fooConstructedInstance = new Foo();

        injector.set("foo", fooConstructedInstance);

        let fooReturnedInstance = injector.get("foo");

        expect(fooReturnedInstance).to.equal(fooConstructedInstance);
    });

    it("should register a factory", () => {
        let injector = new Injector();

        injector.register("foo", Foo.factory);

        let factory = injector._injectables["foo"].factory;
        let fooInjectableInstance = injector._injectables["foo"].instance;

        expect(factory).to.equal(Foo.factory);
        expect(fooInjectableInstance).to.equal(undefined);
    });

    it("should get an instance of previously registered factory", () => {
        let injector = new Injector();

        injector.register("foo", Foo.factory);

        let fooReturnedInstance = injector.get("foo");
        let fooStoredInstance = _.last(Foo.instances);

        expect(fooReturnedInstance).to.equal(fooStoredInstance);
    });

    it("should instantiate of previously registered factory", () => {
        let injector = new Injector();

        injector.register("foo", Foo.factory);
        injector.instantiate("foo");

        let fooInjectableInstance = injector._injectables["foo"].instance;
        let fooStoredInstance = _.last(Foo.instances);

        expect(fooInjectableInstance).to.equal(fooStoredInstance);
    });

    it("should fail getting a not previously set instance or registered factory", () => {
        let injector = new Injector();
        let error = null;

        try {
            injector.get("foo");
        }
        catch (err) {
            error = err;
        }

        expect(error).to.not.equal(null);
    });

    it("should fail instantiating of previously instantiated factory", () => {
        let injector = new Injector();
        let error = null;

        injector.register("foo", Foo.factory);
        injector.instantiate("foo");

        try {
            injector.instantiate("foo");
        }
        catch (err) {
            error = err;
        }

        expect(error).to.not.equal(null);
    });

    class Bar {
        constructor(foo) {
            Bar.instances.push(this);
            this._foo = foo;
        }
    }
    Bar.instances = [];
    Bar.factory = (...args) => new Bar(...args);
    Bar.factory.$inject = ["foo"];

    it("should instantiate of previously registered factory with shallow dependencies", () => {
        let injector = new Injector();

        injector.register("foo", Foo.factory);
        injector.register("bar", Bar.factory);
        injector.instantiate("bar");

        let fooInjectableInstance = injector._injectables["foo"].instance;
        let fooStoredInstance = _.last(Foo.instances);
        let barInjectableInstance = injector._injectables["bar"].instance;
        let barStoredInstance = _.last(Bar.instances);

        expect(fooInjectableInstance).to.equal(fooStoredInstance);
        expect(barInjectableInstance).to.equal(barStoredInstance);
    });

    class Baz {
        constructor(foo) {
            Baz.instances.push(this);
            this._foo = foo;
        }
    }
    Baz.instances = [];
    Baz.factory = (...args) => new Baz(...args);
    Baz.factory.$inject = ["bar"];

    it("should instantiate of previously registered factory with deep dependencies", () => {
        let injector = new Injector();

        injector.register("foo", Foo.factory);
        injector.register("bar", Bar.factory);
        injector.register("baz", Baz.factory);
        injector.instantiate("baz");

        let fooInjectableInstance = injector._injectables["foo"].instance;
        let fooStoredInstance = _.last(Foo.instances);
        let barInjectableInstance = injector._injectables["bar"].instance;
        let barStoredInstance = _.last(Bar.instances);
        let bazInjectableInstance = injector._injectables["baz"].instance;
        let bazStoredInstance = _.last(Baz.instances);

        expect(fooInjectableInstance).to.equal(fooStoredInstance);
        expect(barInjectableInstance).to.equal(barStoredInstance);
        expect(bazInjectableInstance).to.equal(bazStoredInstance);
    });

    class Loop1 {
        constructor(loop2) {
            this._loop2 = loop2;
        }
    }
    Loop1.factory = (...args) => new Baz(...args);
    Loop1.factory.$inject = ["loop2"];

    class Loop2 {
        constructor(loop3) {
            this._loop3 = loop3;
        }
    }
    Loop2.factory = (...args) => new Baz(...args);
    Loop2.factory.$inject = ["loop3"];

    class Loop3 {
        constructor(loop1) {
            this._loop1 = loop1;
        }
    }
    Loop3.factory = (...args) => new Baz(...args);
    Loop3.factory.$inject = ["loop1"];

    it("should fail instantiating a factory with dependency loop", () => {
        let injector = new Injector();
        let error = null;

        injector.register("loop1", Loop1.factory);
        injector.register("loop2", Loop2.factory);
        injector.register("loop3", Loop3.factory);

        try {
            injector.instantiate("loop1");
        }
        catch (err) {
            error = err;
        }

        expect(error).to.not.equal(null);
    });
});
