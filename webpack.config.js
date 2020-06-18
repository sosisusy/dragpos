const path = require("path")
const webpack = require("webpack")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

let minifyGroup = {}
if (process.env.NODE_ENV == "production") {
    minifyGroup = {
        "dragpos.min": "./src/index.ts",
    }
}

module.exports = {
    mode: process.env.NODE_ENV == "production" ? "production" : "development",
    devtool: 'source-map',
    entry: {
        "dragpos": "./src/index.ts",
        ...minifyGroup
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
    },
    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                include: /\.min\.[tj]s$/
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(),
    ],
    resolve: {
        modules: [
            path.join(__dirname, "src"),
            path.join(__dirname, "node_modules"),
            "node_modules",
        ],
        extensions: [".ts", ".js"],
    }
}