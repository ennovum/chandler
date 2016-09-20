import get from 'lodash/get';
import assign from 'lodash/assign';
import fetch from 'fetch';

const TIMEOUT_DEFAULT = 5000;
const ATTEMPTS_DEFAULT = 2;

const TIMEOUT_STATUS = 408;
const TIMEOUT_STATUS_TEXT = 'Request Timeout';

class Fetcher {
    fetch(url, options) {
        const timeout = +get(options, 'timeout', TIMEOUT_DEFAULT);
        const attempts = +get(options, 'attempts', ATTEMPTS_DEFAULT);

        return new Promise((resolve, reject) => {
            let timeoutRef = setTimeout(() => {
                if (attempts > 0) {
                    const attempts = attempts - 1;
                    const options = assign(options, {timeout, attempts});

                    resolve(fetch(url, options));
                }
                else {
                    const status = TIMEOUT_STATUS;
                    const statusText = TIMEOUT_STATUS_TEXT;
                    const responseText = null;

                    reject({status, statusText, responseText});
                }

                timeoutRef = null;
            }, timeout);

            this.request(url, options).then((response) => {
                timeoutRef && clearTimeout(timeoutRef);
                timeoutRef = null;

                resolve(response);
            }, (error) => {
                timeoutRef && clearTimeout(timeoutRef);
                timeoutRef = null;

                reject(error);
            });
        });
    }

    request(url, options) {
        return new Promise((resolve, reject) => {
            fetch(url, options).then((response) => {
                const status = response.status;
                const statusText = response.statusText;

                if (status !== 200) {
                    reject(response.text().then((responseText) => ({status, statusText, responseText})));
                }

                resolve(response);
            });
        });
    }

    fetchText(url, options) {
        return this.fetch(url, options).then((response) => response.text());
    }

    fetchJSON(url, options) {
        return this.fetch(url, options).then((response) => response.json());
    }
}

Fetcher.factory = (...args) => new Fetcher(...args);
Fetcher.factory.$inject = [];

export default Fetcher;
export {Fetcher};
