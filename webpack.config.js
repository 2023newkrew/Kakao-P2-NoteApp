const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'src/app.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: '[name][ext]',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(jpg|jpeg|gif|png|svg|ico)?$/,
                type: "asset/resource"
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/views/index.html',
        })
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src/"),
            "@assets": path.resolve(__dirname, "./src/assets/"),
            "@scripts": path.resolve(__dirname, "./src/scripts/"),
            "@styles": path.resolve(__dirname, "./src/styles/"),
            "@view": path.resolve(__dirname, "./src/views/"),
        },
        extensions:[".js",".jsx",".css"]
    },
    devServer: {
        watchFiles: [
            "src/**"
        ],
        port: 3000,
    },
}