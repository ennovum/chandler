let config = {
    'api': {
        'allegro': {
            'proxy': (url) => '//' + window.location.host + '/api/proxy?url=' + encodeURIComponent(url)
        },
        'ceneo': {
            'proxy': (url) => '//' + window.location.host + '/api/proxy?url=' + encodeURIComponent(url)
        }
    }
};

export default config;
export {config};
