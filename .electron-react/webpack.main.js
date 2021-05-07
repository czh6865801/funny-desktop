'use strict'

var path = require('path')
var mainConfig = {
  entry: {
    main: path.join(__dirname, '../src/MainProcess/index.js')
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, '../src/MainProcess/index.js')],
        use: [
          {
            loader: "babel-loader"
          },
        ],
      },
    ],
    exprContextCritical: false
  },
  node: {
    __dirname: false,
    __filename: false
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    // libraryTarget: 'umd',
    // umdNamedDefine: true,
    path: path.join(__dirname, '../dist')
  },
  target: 'electron-main'
}

module.exports = mainConfig
