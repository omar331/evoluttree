var _ = require('lodash');
var minimist = require('minimist');
var chalk = require('chalk');
var webpack = require('webpack');

var DEFAULT_TARGET = 'BUILD';

var DEFAULT_PARAMS = {
    resolve: {
        extensions: ['', '.ts', '.tsx', '.js']
    },
    entry: {
        main: './src/main.tsx'
    },
    output: {
        publicPath: '',
        filename: 'main.js',
        sourceMapFilename: '[name].[chunkhash].map'
    },
    externals: {
        'auth0-lock': 'Auth0Lock'
    },
    module: {
        loaders: [
            {test: /\.tsx?$/, loader: 'react-hot!ts-loader?jsx=true', exclude: /(\.test.ts$|node_modules)/},
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.tpl.html/, loader: 'html'},
            {test: /\.(ico|png|jpg|gif|svg|eot|ttf|woff|woff2)(\?.+)?$/, loader: 'url?limit=50000'}
        ]
    },
    plugins: [
    ].concat(_bootswatchWorkaround()),
    devServer: {
        contentBase: 'dev/',
        hot: true,
        port: 7000,
        host: "0.0.0.0",
        watchOptions: {
            poll: 2000
        }
    },
    debug: true,
    progress: true,
    colors: true
};

var PARAMS_PER_TARGET = {

    DEV: {
        devtool: 'inline-source-map',
        output: {
            filename: '[name].js'
        },
        plugins: [
        ]
    },

    BUILD: {
        output: {
            path: './build'
        },
        devtool: 'source-map',
        plugins: [
        ]
    },

    DIST: {
        debug: false,
        output: {
            path: './dist'
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin()
        ]
    }

};

var target = _resolveBuildTarget(DEFAULT_TARGET);
var params = _.merge(DEFAULT_PARAMS, PARAMS_PER_TARGET[target], _mergeArraysCustomizer);

_printBuildInfo(target, params);

module.exports = params;

function _resolveBuildTarget(defaultTarget) {
    var target = minimist(process.argv.slice(2)).TARGET;
    if (!target) {
        console.log('No build target provided, using default target instead\n\n');
        target = defaultTarget;
    }
    return target;
}

function _printBuildInfo(target, params) {
    console.log('\nStarting ' + chalk.bold.green('"' + target + '"') + ' build');
    if (target === 'DEV') {
        console.log('Dev server: ' + chalk.bold.yellow('http://localhost:' + params.devServer.port) + '\n\n');
    } else {
        console.log('\n\n');
    }
}

function _mergeArraysCustomizer(a, b) {
    if (_.isArray(a)) {
        return a.concat(b);
    }
}

function _bootswatchWorkaround() {
    var extensions = ['eot', 'woff', 'woff2', 'ttf', 'svg'];

    return extensions.map(function(ext) {
        var regexp = new RegExp('^\.\.\/fonts\/glyphicons-halflings-regular\.' + ext + '$');
        var dest = 'bootswatch/bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.' + ext;
        return new webpack.NormalModuleReplacementPlugin(regexp, dest);
    });
}
