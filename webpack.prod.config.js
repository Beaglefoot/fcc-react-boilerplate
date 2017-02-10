// path.resolve provides absolute path which is required
// in output.path and module.loaders inclusions
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const devModuleConfig = require('./webpack.config.js');

module.exports = Object.assign({}, devModuleConfig, {
  entry: './src/index.jsx',

  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js'
  },

  module: {
    rules: (
      devModuleConfig.module.rules
        .filter(rule => !rule.test.toString().includes('jsx'))
        .concat({
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        })
    )
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
});
