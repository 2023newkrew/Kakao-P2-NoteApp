const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
    require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require("path");

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "src/app.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name][contenthash].js",
        clean: true,
        assetModuleFilename: "[name][ext]",
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                type: "asset/resource",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "src/index.html",
        }),
        //new BundleAnalyzerPlugin(),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        compress: true,
        port: 3000,
        open: true,
        hot: true,
    },
    devtool: "source-map",
    resolve: {
        alias: {
            "@Header": path.resolve(__dirname, "src/views/header"),
            "@Main": path.resolve(__dirname, "src/views/main"),
            "@Snackbar": path.resolve(__dirname, "src/views/snackbar"),
            "@Nav": path.resolve(__dirname, "src/views/main/nav"),
            "@Contents": path.resolve(__dirname, "src/views/main/contents"),
            "@InputArea": path.resolve(
                __dirname,
                "src/views/main/contents/input-area"
            ),
            "@Posts": path.resolve(__dirname, "src/views/main/contents/posts"),
        },
    },
};
