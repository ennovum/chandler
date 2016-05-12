let routing = {
    "routes": {
        "/allegro/listing": {
            "handler": "allegroHandler",
            "method": "listing"
        },
        "/allegro-proxy/listing": {
            "handler": "allegroProxyHandler",
            "method": "listing"
        },
        "/allegro-proxy/listing-user-data": {
            "handler": "allegroProxyHandler",
            "method": "listingUserData"
        }
    }
};

export default routing;
export {routing};
