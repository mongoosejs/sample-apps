'use strict';

const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    app: `${__dirname}/src/index.js`
  },
  target: 'web',
  devtool: false,
  optimization: {
    minimize: false
  },
  output: {
    path: path.join(__dirname, '..', 'public'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        type: 'asset/source'
      },
      {
        test: /\.css$/i,
        type: 'asset/source'
      }
    ]
  }
};