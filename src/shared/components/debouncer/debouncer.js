import _ from "lodash";

const CHECK_INTERVAL_TIME = 1000;

class Debouncer {
    constructor() {
        this._debounces = [];
        this._interval = null;
    }

    create(params) {
        let debounce = new Debounce(params);
        this._debounces.push(debounce);

        this._ensureCheckInterval();

        return debounce;
    }

    destroy(debounce) {
        let index = this._debounces.indexOf(debounce);
        if (index !== -1) {
            this._debounces.splice(index, 1);
        }

        this._validateCheckInterval();
    }

    _ensureCheckInterval() {
        if (!this._interval) {
            this._startCheckInterval();
        }
    }

    _validateCheckInterval() {
        if (this._interval && this._debounces.length === 0) {
            this._stopCheckInterval();
        }
    }

    _startCheckInterval() {
        this._interval = setInterval(() => this._check(), CHECK_INTERVAL_TIME);
    }

    _stopCheckInterval() {
        clearInterval(this._interval);
    }

    _check() {
        this._debounces.forEach((debounce) => debounce.check());
    }
}

class Debounce {
    constructor(params) {
        this._span = _.get(params, 'span', 0);
        this._fn = null;
        this._lastRunTime = null;
    }

    queue(fn) {
        this._fn = fn;
    }

    check() {
        if (!this._fn) {
            return;
        }

        let nowTime = (new Date()).getTime();

        if (!this._lastRunTime || (nowTime >= (this._lastRunTime + this._span))) {
            this._fn();
            this._fn = null
            this._lastRunTime = nowTime;
        }
    }
}

Debouncer.factory = (...args) => new Debouncer(...args);
Debouncer.factory.$inject = [];

export default Debouncer;
export {Debouncer, Debounce};
