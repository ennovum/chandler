let routing = {
    "routes": {
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
