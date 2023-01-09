const common = require('./webpack.common');
const { default: merge } = require("webpack-merge");
const path = require("path");
const dotenv = require('dotenv');

module.exports = () => {
    dotenv.config({path: path.resolve(__dirname, 'prod.env')});
    console.log(process.env.BACKEND_URL);

    return merge(common, {
        mode: 'production',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[contenthash].js',
            assetModuleFilename: '[name][ext]',
            clean: true
        },
    })
}