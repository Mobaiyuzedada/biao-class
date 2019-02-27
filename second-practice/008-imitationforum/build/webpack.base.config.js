const path = require('path');
const fs = require('fs');


module.exports = {
    mode: 'development',
    entry: './prepare/js/index',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.js',
        // chunkFilename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    'sass-loader'
                ]
            }, {
                test: /\.pug$/,
                loader: 'pug-plain-loader',
                options: {
                    publicPath: '../dist/',
                    sourceMap: true
                }
            },
        ]
    }
}