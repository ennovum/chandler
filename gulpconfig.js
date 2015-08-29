var _ = require("lodash");

var packageConfig = require("./package.json");

var gulpconfig = {
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
        "stats": {
            "version": false,
            "modules": true,
            "children": false
        }
    },
    "nodepack": {
        "module": {
            "loaders": [
                {"loader": "babel-loader", "test": /\.js$/, "exclude": /node_modules/}
            ]
        },
        "stats": {
            "version": false,
            "modules": true,
            "children": false
        },
        "externals": _.transform(packageConfig.dependencies, function (externals, version, name) {
            externals[name] = "commonjs " + name;
        }),
        "node": {
            "__filename": true,
            "__dirname": true
        }
    },
    "eslint": {}
};

module.exports = gulpconfig;
