var webpack = require('webpack');
var path = require('path');
var HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: {
    simple: ['src/simple/index.js']
  },
  output: {
    path: path.join(__dirname, 'examples'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: [path.join(__dirname, 'src')],
        loaders: ['babel-loader']
      }
    ],
    preLoaders: [
      {
        test: /\.jsx?/,
        include: [path.join(__dirname, 'src')],
        loaders: ['eslint-loader']
      }
    ]
  },
  resolve: {
    root: __dirname,
    extensions: ['', '.jsx', '.js']
  },
  plugins: [
    new HtmlPlugin()
  ]
};
