const conf = {
    'api': {
        'proxy': (url) => 'http://cors.io?u=' + encodeURIComponent(url)
    }
};

export default conf;
export {conf};
