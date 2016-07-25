const process = require('process');

const buildconfigDefault = {
    'path': {
        'root': __dirname,
        'npm': __dirname + '/node_modules',
        'bower': __dirname + '/bower_components'
    },
    'dir': {
        'src': '/src',
        'dev': '/dev',
        'test': '/test',
        'dist': '/dist',
        'client': '/client',
        'server': '/server',
        'shared': '/shared'
    },
    'webpack': {
        'module': {
            'loaders': [
                {'loader': 'babel-loader', 'test': /\.js$/, 'exclude': /node_modules/},
                {'loader': 'raw-loader', 'test': /\.html$/}
            ]
        },
        'stats': {
            'version': false,
            'modules': true,
            'children': false
        },
        'resolve': {
            'alias': {
                'es6Promise': 'es6-promise',
                'fetch': __dirname + '/src/shared/modules/fetch/fetch.js',
                'angularRoute': 'angular-route'
            }
        },
        'devtool': 'inline-source-map'
    },
    'nodepack': {
        'module': {
            'loaders': [
                {'loader': 'babel-loader', 'test': /\.js$/, 'exclude': /node_modules/}
            ]
        },
        'stats': {
            'version': false,
            'modules': true,
            'children': false
        },
        'resolve': {
            'alias': {
            }
        },
        'externals': {
            'es6Promise': 'commonjs es6-promise',
            'fetch': 'commonjs node-fetch',
            'express': 'commonjs express',
            'lodash': 'commonjs lodash',
            'morgan': 'commonjs morgan'
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
    'mocha': {
        'bail': true
    },
    'uglifyJs': {},
    'cleanCss': {}
};

const buildconfigMap = {
    'default': buildconfigDefault
}

const build = process.env.npm_package_config_build;
const buildconfig = buildconfigMap[build];

if (buildconfig === undefined) {
    throw new Error('Build config not found (' + build + ').');
}

module.exports = buildconfig;
