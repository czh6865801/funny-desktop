const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'source-map',
  target: "electron-renderer",
  entry: {
    index: path.resolve(__dirname, '../src/RendererProcess/entry/index.js')
  },
  devServer: {
    port: 9080,
    contentBase: './src/RendererProcess',
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                strictMath: true,
              },
            },
          }
        ],
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/RendererProcess/public/index.html'),
    }),
  ]
})
