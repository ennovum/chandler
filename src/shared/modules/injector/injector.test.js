import test from 'tape';
import _ from 'lodash';

import Injector from './injector.js';

class Foo {
    constructor() {
        Foo.instances.push(this);
    }
}
Foo.instances = [];
Foo.factory = (...args) => new Foo(...args);
Foo.factory.$inject = [];

test('should set an instance', (assert) => {
    let injector = new Injector();
    let fooConstructedInstance = new Foo();

    injector.set('foo', fooConstructedInstance);

    let fooInjectableInstance = injector._injectables['foo'].instance;

    assert.equal(fooInjectableInstance, fooConstructedInstance);
    assert.end();
});

test('should get a previously set instance', (assert) => {
    let injector = new Injector();
    let fooConstructedInstance = new Foo();

    injector.set('foo', fooConstructedInstance);

    let fooReturnedInstance = injector.get('foo');

    assert.equal(fooReturnedInstance, fooConstructedInstance);
    assert.end();
});

test('should register a factory', (assert) => {
    let injector = new Injector();

    injector.register('foo', Foo.factory);

    let factory = injector._injectables['foo'].factory;
    let fooInjectableInstance = injector._injectables['foo'].instance;

    assert.equal(factory, Foo.factory);
    assert.equal(fooInjectableInstance, undefined);
    assert.end();
});

test('should get an instance of previously registered factory', (assert) => {
    let injector = new Injector();

    injector.register('foo', Foo.factory);

    let fooReturnedInstance = injector.get('foo');
    let fooStoredInstance = _.last(Foo.instances);

    assert.equal(fooReturnedInstance, fooStoredInstance);
    assert.end();
});

test('should instantiate of previously registered factory', (assert) => {
    let injector = new Injector();

    injector.register('foo', Foo.factory);
    injector.instantiate('foo');

    let fooInjectableInstance = injector._injectables['foo'].instance;
    let fooStoredInstance = _.last(Foo.instances);

    assert.equal(fooInjectableInstance, fooStoredInstance);
    assert.end();
});

test('should fail getting a not previously set instance or registered factory', (assert) => {
    let injector = new Injector();
    let error = null;

    try {
        injector.get('foo');
    }
    catch (err) {
        error = err;
    }

    assert.notEqual(error, null);
    assert.end();
});

test('should fail instantiating of previously instantiated factory', (assert) => {
    let injector = new Injector();
    let error = null;

    injector.register('foo', Foo.factory);
    injector.instantiate('foo');

    try {
        injector.instantiate('foo');
    }
    catch (err) {
        error = err;
    }

    assert.notEqual(error, null);
    assert.end();
});

class Bar {
    constructor(foo) {
        Bar.instances.push(this);
        this._foo = foo;
    }
}
Bar.instances = [];
Bar.factory = (...args) => new Bar(...args);
Bar.factory.$inject = ['foo'];

test('should instantiate of previously registered factory with shallow dependencies', (assert) => {
    let injector = new Injector();

    injector.register('foo', Foo.factory);
    injector.register('bar', Bar.factory);
    injector.instantiate('bar');

    let fooInjectableInstance = injector._injectables['foo'].instance;
    let fooStoredInstance = _.last(Foo.instances);
    let barInjectableInstance = injector._injectables['bar'].instance;
    let barStoredInstance = _.last(Bar.instances);

    assert.equal(fooInjectableInstance, fooStoredInstance);
    assert.equal(barInjectableInstance, barStoredInstance);
    assert.end();
});

class Baz {
    constructor(foo) {
        Baz.instances.push(this);
        this._foo = foo;
    }
}
Baz.instances = [];
Baz.factory = (...args) => new Baz(...args);
Baz.factory.$inject = ['bar'];

test('should instantiate of previously registered factory with deep dependencies', (assert) => {
    let injector = new Injector();

    injector.register('foo', Foo.factory);
    injector.register('bar', Bar.factory);
    injector.register('baz', Baz.factory);
    injector.instantiate('baz');

    let fooInjectableInstance = injector._injectables['foo'].instance;
    let fooStoredInstance = _.last(Foo.instances);
    let barInjectableInstance = injector._injectables['bar'].instance;
    let barStoredInstance = _.last(Bar.instances);
    let bazInjectableInstance = injector._injectables['baz'].instance;
    let bazStoredInstance = _.last(Baz.instances);

    assert.equal(fooInjectableInstance, fooStoredInstance);
    assert.equal(barInjectableInstance, barStoredInstance);
    assert.equal(bazInjectableInstance, bazStoredInstance);
    assert.end();
});

class Loop1 {
    constructor(loop2) {
        this._loop2 = loop2;
    }
}
Loop1.factory = (...args) => new Baz(...args);
Loop1.factory.$inject = ['loop2'];

class Loop2 {
    constructor(loop3) {
        this._loop3 = loop3;
    }
}
Loop2.factory = (...args) => new Baz(...args);
Loop2.factory.$inject = ['loop3'];

class Loop3 {
    constructor(loop1) {
        this._loop1 = loop1;
    }
}
Loop3.factory = (...args) => new Baz(...args);
Loop3.factory.$inject = ['loop1'];

test('should fail instantiating a factory with dependency loop', (assert) => {
    let injector = new Injector();
    let error = null;

    injector.register('loop1', Loop1.factory);
    injector.register('loop2', Loop2.factory);
    injector.register('loop3', Loop3.factory);

    try {
        injector.instantiate('loop1');
    }
    catch (err) {
        error = err;
    }

    assert.notEqual(error, null);
    assert.end();
});
