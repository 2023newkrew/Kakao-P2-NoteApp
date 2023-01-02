const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/app.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Caching',
      filename: 'index.html',
      template: 'src/views/index.html',
    }),
  ],
};
