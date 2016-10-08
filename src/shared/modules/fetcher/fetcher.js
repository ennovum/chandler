import get from 'lodash/get';
import assign from 'lodash/assign';
import request from 'request';

const TIMEOUT_MS_DEFAULT = 5000;
const ATTEMPTS_DEFAULT = 2;

class Fetcher {
    fetch(url, options) {
        const timeout = get(options, 'timeout', TIMEOUT_MS_DEFAULT);
        const attempts = get(options, 'attempts', ATTEMPTS_DEFAULT);

        return this.request(url, options).then((response) => response, (error) => {
            if (attempts > 0) {
                const attempts = attempts - 1;
                const options = assign(options, {timeout, attempts});

                return this.fetch(url, options);
            }

            throw error;
        });
    }

    request(url, options) {
        return new Promise((resolve, reject) => {
            request(assign(options, {url}), (error, response, body) => {
                if (error) {
                    reject(error);
                    return;
                }

                const status = response.status;
                const statusText = response.statusText;

                resolve({status, statusText, body, error});
            });
        });
    }

    fetchText(url, options) {
        return this.fetch(url, options).then((response) => response.body);
    }

    fetchJSON(url, options) {
        return this.fetch(url, options).then((response) => JSON.parse(response.body));
    }
}

Fetcher.factory = (...args) => new Fetcher(...args);
Fetcher.factory.$inject = [];

export default Fetcher;
export {Fetcher};
