const config = {
    'api': {
        'proxy': (url) => '//' + window.location.host + '/api/proxy?url=' + encodeURIComponent(url)
    }
};

export default config;
export {config};
