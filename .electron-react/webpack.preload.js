'use strict'

var path = require('path')
var mainConfig = {
  entry: {
    index: path.join(__dirname, '../src/MainProcess/preload/index.js')
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          },
        ],
      },
    ],
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '../dist/preload')
  },
  target: 'electron-preload'
}

module.exports = mainConfig
