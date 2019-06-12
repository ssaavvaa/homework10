

const merge = require('webpack-merge');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');



const loadModeConfig = env => require(`./build-utils/${env.mode}.config`)(env);

module.exports = env => merge({
  resolve: {
    alias: { 'react-dom': '@hot-loader/react-dom' }
  },
  stats:{ all: false, errors: true, warnings: true, errorDetails: true },
  mode:env.mode,
  entry:{ path: path.resolve(__dirname,'./src/index.js')},

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use:{
        loader: 'babel-loader'
      }
      }
    ]
  },

  plugins:[
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin()
  ]


},loadModeConfig(env));

