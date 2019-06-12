const webpack = require ('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = env => ({
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    devtool:'source-map',
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
      },
      output: {
            path: path.resolve(__dirname, '../dist'),
            filename: 'bundle.js'
      },
    module: {
        rules:[
            {
            test: /\.(sa|sc|c)ss$/,
            exclude: /node_modules/,
            use: [
                 { loader: MiniCssExtractPlugin.loader},
                 { loader: "css-loader"},
                 { loader: "postcss-loader"},
                 { loader: "sass-loader"}
            ]
            },
            {
            test: /\.(gif|png|jpe?g|svg)$/,
            exclude: /node_modules/,
            use:[
                { loader:'file-loader',options:{name:'assets/[name].[ext]'}},
                { loader: 'image-webpack-loader',
                  options: {
                      mozjpeg: { progressive: true, quality: 65 },
                      optipng: { enable:true },
                      pngquant: { quality: '65-90', speed: 4 },
                      gifsicle: { interlaced: false }
                    }
                }
                ]
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        }),
        new HtmlWebpackPlugin({
            filename:"./index.html",
            template:'./src/index.html',
            minify:{
                collapseWhitespace:true,
                removeComments:true,
                removeRedundantAttributes:true,
                removeScriptTypeAttributes:true,
                removeStyleLinkTypeAttributes:true,
                useShortDoctype:true
            }
           })
      ]

});