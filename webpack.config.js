const HtmlWebpackPlugin = require('html-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/app.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: process.env.NODE_ENV === 'production' ? true : false,
    assetModuleFilename: '[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader' /** Create style node */,
          'css-loader' /** Translate CSS into CommonJS */,
          'sass-loader' /** Compile SASS to CSS */,
        ], // 역순으로 로더가 작동한다. 이 순서를 지켜야한다.
      },
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|webp|gif)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/views/index.html',
    }),
    // new BundleAnalyzerPlugin(),
  ],
  devtool: process.env.NODE_ENV ? 'eval-source-map' : 'source-map',
  devServer: {
    port: 3000,
    hot: true,
  },
};
