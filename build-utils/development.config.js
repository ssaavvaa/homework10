
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');


module.exports = env => ({
    devtool: 'eval',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
      },
    module:{
        rules:[
            {
            test: /\.(sa|sc|c)ss$/,
            exclude: /node_modules/,
            use: [
                { loader: "style-loader"},
                { loader: "css-loader"},
                { loader: "postcss-loader"},
                { loader: "sass-loader", options: {implementation: require("node-sass")}}
                 ]
            },
            {
            test: /\.(gif|png|jpe?g|svg)$/i,
            exclude: /node_modules/,
            use:[{loader:'file-loader',options:{name:'./assets/[name].[ext]'}}]
        }
    ]
    },
    plugins:[
        new HtmlWebpackPlugin({filename:"./index.html",
        template:'./src/index.html'}),
        new FriendlyErrorsWebpackPlugin()
    ],
    devServer:{
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback:true,
        compress: true,
        open: 'Chrome',
        noInfo:true,
        hot: true,
        quiet:true,
        clientLogLevel:'warning'
    }
});







