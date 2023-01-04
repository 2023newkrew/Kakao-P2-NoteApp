const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/app.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
    assetModuleFilename: '[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 'style-loader' /** Create style node */,
          MiniCssExtractPlugin.loader, // js 전에 CSS 적용 위함
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
    new MiniCssExtractPlugin(),
  ],
  devtool: process.env.NODE_ENV ? 'eval-source-map' : 'source-map',
  devServer: {
    port: 3000,
    compress: true,
    hot: false,
    liveReload: true,
    open: true,
    watchFiles: ['src/**/*.js', 'src/**/*.scss', 'public/**/*'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/js/'),
      '@views': path.resolve(__dirname, 'src/views/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@constants': path.resolve(__dirname, 'src/js/constants/'),
      '@models': path.resolve(__dirname, 'src/js/models/'),
      '@utils': path.resolve(__dirname, 'src/js/utils/'),
    },
  },
};
