let crypto = require("crypto");

class AllegroHasher {
    hashPassword(password) {
        let sha256 = crypto.createHash("sha256");
        sha256.update(password, "utf8");

        return sha256.digest("base64");
    }
}

export default AllegroHasher;
