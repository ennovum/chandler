const config = {
    'api': {
        'proxy': (url) => 'http://cors.io?u=' + encodeURIComponent(url)
    }
};

export default config;
export {config};
