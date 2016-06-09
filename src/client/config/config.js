let config = {
    'api': {
        'resources': {
            'allegro': {
                'listing': (phrase, page) => {
                    let encodedPhrase = encodeURIComponent(phrase);
                    let url = `http://allegro.pl/listing/listing.php?order=t&string=${encodedPhrase}&p=${page}`;
                    let encodedUrl = encodeURIComponent(url);
                    return '//' + window.location.host + `/api/proxy?url=${encodedUrl}`
                },
                'listingUserData': (userId) => {
                    let url = `http://allegro.pl/listing-user-data/users/${userId}`;
                    let encodedUrl = encodeURIComponent(url);
                    return '//' + window.location.host + `/api/proxy?url=${encodedUrl}`;
                }
            },
            'ceneo': {
                'listing': (phrase, page) => {
                    let encodedPhrase = encodeURIComponent(phrase);
                    let url = `http://www.ceneo.pl/;szukaj-${encodedPhrase};0020-30-0-0-{page+1}.htm`;
                    let encodedUrl = encodeURIComponent(url);
                    return '//' + window.location.host + `/api/proxy?url=${encodedUrl}`
                },
                'product': (productId) => {
                    let url = `http://www.ceneo.pl/${productId}`;
                    let encodedUrl = encodeURIComponent(url);
                    return '//' + window.location.host + `/api/proxy?url=${encodedUrl}`
                }
            }
        }
    }
};

export default config;
export {config};
