var webpack = require('webpack');

module.exports = {
    entry: './main.js',
    output: {
        path: './',
        filename: 'index.js'
    },
    devServer: {
        inline: true,
        hot: true,
        port: 7000,
        host: "0.0.0.0",
        watchOptions: {
            poll: 500
        }

    },
    module: {
        loaders: [
            {
                test: /.js$/,
                exclude: /react-hot|node_modules/,
                loaders: ['react-hot','babel?presets[]=es2015,presets[]=react']
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}