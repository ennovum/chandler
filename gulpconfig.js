module.exports = {
    "path": {
        "root": __dirname,
        "npm": __dirname + "/node_modules",
        "bower": __dirname + "/bower_components"
    },
    "dir": {
        "src": "/src",
        "dev": "/dev",
        "dist": "/dist",
        "client": "/client",
        "server": "/server",
        "shared": "/shared"
    },
    "webpack": {
        "module": {
            "loaders": [
                {"loader": "babel-loader", "test": /\.js$/, "exclude": /node_modules/},
                {"loader": "raw-loader", "test": /\.tpl$/}
            ]
        },
        "resolve": {
            "alias": {}
        },
        "stats": {
            "version": false,
            "modules": true,
            "children": false
        }
    },
    "eslint": {}
};
