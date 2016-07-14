import _ from 'lodash';

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

    child(index) {
        if (!this._el) {
            return undefined;
        }

        if (index < 0) {
            index += this._el.childNodes.length;
        }
        
        return new CraweblerElement(this._el.childNodes[index]);
    }

    previous() {
        if (!this._el) {
            return new CraweblerElement(undefined);
        }

        return new CraweblerElement(this._el.previousSibling);
    }

    previousElement() {
        if (!this._el) {
            return new CraweblerElement(undefined);
        }

        return new CraweblerElement(this._el.previousElementSibling);
    }

    next() {
        if (!this._el) {
            return new CraweblerElement(undefined);
        }

        return new CraweblerElement(this._el.nextSibling);
    }

    nextElement() {
        if (!this._el) {
            return new CraweblerElement(undefined);
        }

        return new CraweblerElement(this._el.nextElementSibling);
    }

    collection(selector) {
        if (!this._el) {
            return new CraweblerCollection(undefined);
        }

        return new CraweblerCollection(this._el.querySelectorAll(selector));
    }

    text() {
        if (!this._el) {
            return undefined;
        }

        return _.trim(this._el.textContent);
    }

    number() {
        if (!this._el) {
            return undefined;
        }

        return Number(this.text());
    }

    attribute(name) {
        if (!this._el) {
            return undefined;
        }

        return _.trim(this._el.getAttribute(name));
    }
}

class CraweblerCollection {
    constructor(coll) {
        this._coll = coll;
    }

    element(index) {
        if (!this._coll) {
            return new CraweblerElement(undefined);
        }

        return new CraweblerElement(this._coll[index]);
    }

    count() {
        if (!this._coll) {
            return undefined;
        }

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
