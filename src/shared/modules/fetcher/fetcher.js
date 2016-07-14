import fetch from 'fetch';

class Fetcher {
    fetchText(url) {
        return fetch(url).then((response) => {
            let status = response.status;
            let statusText = response.statusText;

            if (status !== 200) {
                return response.text().then((responseText) => {
                    throw new Error({status, statusText, responseText});
                });
            }

            return response.text();
        });
    }

    fetchJSON(url) {
        return fetch(url).then((response) => {
            let status = response.status;
            let statusText = response.statusText;

            if (status !== 200) {
                return response.text().then((responseText) => {
                    throw new Error({status, statusText, responseText});
                });
            }

            return response.json();
        });
    }
}

Fetcher.factory = (...args) => new Fetcher(...args);
Fetcher.factory.$inject = [];

export default Fetcher;
export {Fetcher};
