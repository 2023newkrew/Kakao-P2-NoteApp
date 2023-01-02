const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src/app.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name][contenthash].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/views/index.html",
      title: "Caching",
    }),
  ],
  devServer: {
    static: { directory: path.join(__dirname, "dist"), watch: true },
    compress: true,
    port: 3000,
    open: true,
    watchFiles: ["src/**"],
    liveReload: true,
  },
};
