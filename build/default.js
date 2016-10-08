const path = require('path');

const root = path.resolve(__dirname + '/..');

const conf = {
    'path': {
        'root': root,
        'npm': path.resolve(root, 'node_modules')
    },
    'dir': {
        'conf': '/conf',
        'lang': '/lang',
        'src': '/src',
        'dev': '/dev',
        'dist': '/dist',
        'webui': '/webui',
        'server': '/server',
        'shared': '/shared',
        'modules': '/modules'
    },
    'webpack': {
        'module': {
            'loaders': [
                {'loader': 'babel-loader', 'test': /\.js$/, 'exclude': /node_modules/, query: {presets: ['es2015']}},
                {'loader': 'json-loader', 'test': /\.json$/},
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
                path.resolve(root, 'src')
            ],
            'modulesDirectories': ['node_modules'],
            'alias': {
                'webui': root + '/src/webui/modules',
                'server': root + '/src/server/modules',
                'shared': root + '/src/shared/modules',
                'es6Promise': 'es6-promise',
                'request': 'browser-request',
                'angularRoute': 'angular-route'
            }
        },
        'devtool': 'inline-source-map'
    },
    'nodepack': {
        'module': {
            'loaders': [
                {'loader': 'babel-loader', 'test': /\.js$/, 'exclude': /node_modules/, query: {presets: ['es2015']}},
                {'loader': 'json-loader', 'test': /\.json$/},
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
                path.resolve(root, 'src')
            ],
            'modulesDirectories': ['node_modules'],
            'alias': {
                'webui': root + '/src/webui/modules',
                'server': root + '/src/server/modules',
                'shared': root + '/src/shared/modules'
            }
        },
        'externals': {
            'es6Promise': 'commonjs es6-promise',
            'request': 'commonjs request',
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
