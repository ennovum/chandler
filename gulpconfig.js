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
                {"loader": "raw-loader", "test": /\.html$/}
            ]
        },
        "stats": {
            "version": false,
            "modules": true,
            "children": false
        },
        "resolve": {
            "alias": {
                "angularRoute": "angular-route",
                "es6Promise": "es6-promise"
            }
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
        "resolve": {
            "alias": {
            }
        },
        "externals": {
            "es6Promise": "commonjs es6-promise",
            "express": "commonjs express",
            "lodash": "commonjs lodash",
            "morgan": "commonjs morgan",
            "osmosis": "commonjs osmosis",
            "soap": "commonjs soap",
            "url": "commonjs url"
        },
        "node": {
            "__filename": true,
            "__dirname": true
        }
    },
    "watch": {
        "interval": 1000,
        "debounceDelay": 1000
    },
    "sass": {
        "errLogToConsole": true
    }
};

module.exports = gulpconfig;
