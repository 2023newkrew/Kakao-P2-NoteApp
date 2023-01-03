const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');

module.exports = merge(baseConfig, {
  mode: 'development',
  plugins: [
    new BundleAnalyzerPlugin(),
  ],
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
    open: true,
  },
});
