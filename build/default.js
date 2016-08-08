const path = require('path');

const conf = {
    'path': {
        'root': path.resolve(__dirname + '/..'),
        'npm': path.resolve(__dirname + '/../node_modules'),
        'bower': path.resolve(__dirname + '/../bower_components')
    },
    'dir': {
        'conf': '/conf',
        'lang': '/lang',
        'src': '/src',
        'dev': '/dev',
        'dist': '/dist',
        'client': '/client',
        'server': '/server',
        'shared': '/shared'
    },
    'webpack': {
        'module': {
            'loaders': [
                {'loader': 'babel-loader', 'test': /\.js$/, 'exclude': /node_modules/, query: {presets: ['es2015']}},
                {'loader': 'raw-loader', 'test': /\.html$/}
            ]
        },
        'stats': {
            'version': false,
            'modules': true,
            'children': false
        },
        'resolve': {
            'root': [
                path.resolve(__dirname + '/..'),
                path.resolve(__dirname + '/../src/client'),
                path.resolve(__dirname + '/../src/shared')
            ],
            'modulesDirectories': [
                'node_modules',
                'modules'
            ],
            'alias': {
                'fetch': __dirname + '/../src/shared/modules/fetch/fetch.js',
                'es6Promise': 'es6-promise',
                'angularRoute': 'angular-route'
            }
        },
        'devtool': 'inline-source-map'
    },
    'nodepack': {
        'module': {
            'loaders': [
                {'loader': 'babel-loader', 'test': /\.js$/, 'exclude': /node_modules/, query: {presets: ['es2015']}}
            ]
        },
        'stats': {
            'version': false,
            'modules': true,
            'children': false
        },
        'resolve': {
            'root': [
                path.resolve(__dirname + '/..'),
                path.resolve(__dirname + '/../src/server'),
                path.resolve(__dirname + '/../src/shared')
            ],
            'modulesDirectories': [
                'node_modules',
                'modules'
            ],
            'alias': {
            }
        },
        'externals': {
            'es6Promise': 'commonjs es6-promise',
            'fetch': 'commonjs node-fetch',
            'express': 'commonjs express',
            'lodash': 'commonjs lodash',
            'morgan': 'commonjs morgan',
            'tape': 'commonjs tape'
        },
        'node': {
            '__filename': true,
            '__dirname': true
        },
        'devtool': 'inline-source-map'
    },
    'watch': {
        'interval': 1000,
        'debounceDelay': 1000
    },
    'sass': {},
    'autoprefixer': {
        'browsers': ['last 2 versions'],
        'cascade': false
    },
    'mocha': {},
    'uglifyJs': {},
    'cleanCss': {}
};

module.exports = conf;
