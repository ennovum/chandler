import {parseTags, matchTags} from 'tagger/tagger.js';

let CACHE_TIME = 1000 * 60;

class Stock {
    constructor() {
        this.promisedMap = {};
        this.cachedMap = {};
    }

    set(id, data, tagslug) {
        this.cachedMap[id] = {
            time: (new Date()).getTime(),
            data: data,
            tags: parseTags(tagslug)
        };

        return Promise.resolve(data);
    }

    get(id) {
        return this.validate(id)
            .then(() => {
                let cached = this.cachedMap[id];
                return cached && cached.data || undefined;
            });
    }

    del(id) {
        let cached = this.cachedMap[id];
        delete this.cachedMap[id];

        return Promise.resolve(cached && cached.data || undefined);
    }

    validate(id) {
        let cached = this.cachedMap[id];
        let time = (new Date()).getTime();

        if (cached && time - cached.time > CACHE_TIME) {
            delete this.cachedMap[id];
            cached = undefined;
        }

        return Promise.resolve(cached);
    }

    have(id, getter, tagslug, reload) {
        return this.validate(id)
            .then(() => {
                let cached = this.cachedMap[id];
                if (cached && !reload) {
                    return this.get(id);
                }

                let promised = this.promisedMap[id];
                if (promised && !reload) {
                    return promised;
                }

                return this.promisedMap[id] = getter()
                    .then((data) => {
                        delete this.promisedMap[id];
                        return this.set(id, data, tagslug);
                    }, (err) => {
                        delete this.promisedMap[id];
                        return Promise.reject(err);
                    });
            });
    }

    clear() {
        this.cachedMap = {};

        return Promise.resolve();
    }

    trash(tagslug) {
        if (tagslug) {
            let filterTags = parseTags(tagslug);
            return this.filter((id, data, tags) => !matchTags(tags, filterTags));
        }
        else {
            return this.clear();
        }
    }

    filter(fn) {
        Object.keys(this.cachedMap).forEach((id) => {
            this.validate(id);
            let cached = this.cachedMap[id];

            if (cached && !fn(id, cached.data, cached.tags)) {
                delete this.cachedMap[id];
            }
        });

        return Promise.resolve();
    }
}

Stock.factory = (...args) => new Stock(...args);
Stock.factory.$inject = [];

export default Stock;
export {Stock};
