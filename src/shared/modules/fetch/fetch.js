import 'whatwg-fetch';

function fetch(...args) {
    if (window.fetch) {
        return window.fetch(...args);
    }

    throw new Error('fetch not found');
}

export default fetch;
export {fetch};
