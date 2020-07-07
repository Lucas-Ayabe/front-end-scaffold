const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
    entry: ["./src/assets/ts/app.ts", "./src/assets/scss/app.scss"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "assets/js/app.bundle.js",
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            minify: false,
        }),
        new MiniCssExtractPlugin({
            filename: "assets/css/app.bundle.css",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: ["babel-loader", "ts-loader"],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // only enable hot in development
                            hmr: process.env.NODE_ENV === "development",
                            // if hmr does not work, this is a forceful method.
                            reloadAll: true,
                        },
                    },
                    {
                        loader: "css-loader?-url",
                    },
                    {
                        loader: "postcss-loader",
                    },
                    {
                        loader: "sass-loader",
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    devServer: {
        contentBase: path.resolve(__dirname, "public"),
        open: true,
    },
};
