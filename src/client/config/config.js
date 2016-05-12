let config = {
    "api": {
        "baseUrl": "//" + window.location.host + "/api",
        "resources": {
            "allegro": {
                "listing": (query, page) => "//" + window.location.host + `/api/allegro-proxy/listing?query=${query}&page=${page}`,
                "listingUserData": (userId) => "//" + window.location.host + `/api/allegro-proxy/listing-user-data?user-id=${userId}`
            }
        }
    }
};

export default config;
export {config};
