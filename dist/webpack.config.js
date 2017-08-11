'use strict';

var path = require('path');
var webpack = require('webpack');
module.exports = {
  // module.exports = {
  //   entry: './public/javascripts/index.js',
  //   output: {
  //     filename: './public/javascripts/bundle.js'
  //   }
  // }
  entry: './lib/app.js',
  output: {
    filename: './public/javascripts/app.bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
//# sourceMappingURL=webpack.config.js.map