import _ from 'lodash';

class I18n {
    constructor() {
        this._lang = null;
    }

    setLang(lang) {
        this._lang = lang;
    }

    getLang(ns) {
        return ns ? _.get(this._lang, ns, null) : this._lang;
    }
}

I18n.service = (...args) => new I18n(...args);
I18n.service.$inject = [];

export default I18n;
export {I18n};
