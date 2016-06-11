let config = {
    'api': {
        'allegro': {
            'proxy': (url) => 'http://cors.io/?u=' + encodeURIComponent(url)
        },
        'ceneo': {
            'proxy': (url) => 'http://cors.io/?u=' + encodeURIComponent(url)
        }
    }
};

export default config;
export {config};
