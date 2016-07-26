const conf = {
    'api': {
        'proxy': (url) => '//' + window.location.host + '/api/proxy?url=' + encodeURIComponent(url)
    }
};

export default conf;
export {conf};
