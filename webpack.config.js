const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    devtool: "inline-source-map",
    plugins : [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),/*
        new HtmlWebPackPlugin({
            template: "./src/template/menu.html",
            filename: "menu.html"
        }),*/
    ],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    } ,
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/preset-env", {targets: "defaults"}],
                        ],
                    },
                },
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
};