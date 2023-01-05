const common = require('./webpack.common');
const { default: merge } = require("webpack-merge");
const path = require("path");

module.exports = merge(common, {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        assetModuleFilename: '[name][ext]',
        clean: true
    },
    devServer: {
        watchFiles: [
            "src/**"
        ],
        port: 3000,
    },
    devtool: 'eval-cheap-source-map',
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
})