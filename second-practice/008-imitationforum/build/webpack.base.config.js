const path = require('path');
const fs = require('fs');

const webpack = require('webpack');

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
    },
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin('common'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            Popper:['popper.js','default'],
        })
    ],
    alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
        'assets': path.resolve(__dirname, '../scr/assets'),
        'jquery':'jquery/src/jquery'
    }
}