const common = require('./webpack.common');
const { default: merge } = require("webpack-merge");
const path = require("path");

module.exports = merge(common, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: '[name][ext]',
        clean: true
    },
})