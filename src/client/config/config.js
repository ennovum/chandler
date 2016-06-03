let config = {
    "api": {
        "resources": {
            "allegro": {
                "listing": (query, page) => {
                	let encodedQuery = encodeURIComponent(query);
                	let url = `http://allegro.pl/listing/listing.php?order=t&string=${encodedQuery}&p=${page}`;
                	let encodedUrl = encodeURIComponent(url);
                	return "//" + window.location.host + `/api/proxy?url=${encodedUrl}`
                },
                "listingUserData": (userId) => {
                	let url = `http://allegro.pl/listing-user-data/users/${userId}`;
                	let encodedUrl = encodeURIComponent(url);
                	return "//" + window.location.host + `/api/proxy?url=${encodedUrl}`;
                }
            }
        }
    }
};

export default config;
export {config};
