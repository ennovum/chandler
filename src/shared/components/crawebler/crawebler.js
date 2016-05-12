import _ from 'lodash';

import {trim} from '../trimmer/trimmer.js'

const PARSER_MODE_HTML = 'text/html';

class Crawebler {
    crawl(source) {
        this._doc = new DOMParser().parseFromString(source, PARSER_MODE_HTML);
        return new CraweblerElement(this._doc);
    }
}

class CraweblerElement {
    constructor(el) {
        this._el = el;
    }

    element(selector) {
        return new CraweblerElement(this._el.querySelector(selector));
    }

    collection(selector) {
        return new CraweblerCollection(this._el.querySelectorAll(selector));
    }

    text() {
        return trim(this._el.innerText);
    }

    attribute(name) {
        return trim(this._el.getAttribute(name));
    }
}

class CraweblerCollection {
    constructor(coll) {
        this._coll = coll;
    }

    count() {
        return this._coll.length;
    }

    forEach(fn) {
        return _.forEach(this._coll, (el) => fn(new CraweblerElement(el)));
    }

    map(fn) {
        return _.map(this._coll, (el) => fn(new CraweblerElement(el)));
    }

    reduce(fn, initial) {
        return _.reduce(this._coll, (el) => fn(new CraweblerElement(el)), initial);
    }
}

Crawebler.factory = (...args) => new Crawebler(...args);
Crawebler.factory.$inject = [];

export default Crawebler;
export {Crawebler, CraweblerElement, CraweblerCollection};
