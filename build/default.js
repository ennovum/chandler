const conf = {
    'path': {
        'root': __dirname + '/..',
        'npm': __dirname + '/../node_modules',
        'bower': __dirname + '/../bower_components'
    },
    'dir': {
        'conf': '/conf',
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
                'fetch': __dirname + '/../src/shared/modules/fetch/fetch.js',
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
