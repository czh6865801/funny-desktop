'use strict'

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //打包前清空build目录文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); //压缩css
const { merge } =  require('webpack-merge');
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
  mode: 'production',
  target: "electron-renderer",
  stats: 'normal', // 打包日志发生错误和新的编译时输出
  entry: {
    index: path.resolve(__dirname, '../src/RendererProcess/entry/index.js')
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/i,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../'
          }
        }, {
          loader: 'css-loader'
        }, {
          loader: "less-loader",
          options: {
            lessOptions: {
              strictMath: true,
            },
          },
        }]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/RendererProcess/public/index.html'),
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '../dist/css/[name].css',
      chunkFilename: '../dist/css/[id].css',
    }),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
})

