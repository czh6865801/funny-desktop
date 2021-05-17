'use strict'

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //打包前清空build目录文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); //压缩css

process.env.NODE_ENV = 'production'

module.exports = {
  mode: 'production',
  target: "electron-renderer",
  stats: 'normal', // 打包日志发生错误和新的编译时输出
  entry: {
    index: path.resolve(__dirname, '../src/RendererProcess/entry/index.js')
  },
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, '../src')],
        use: [
          {
            loader: "babel-loader"
          },
        ],
      },
      {
        test: /\.html$/i,
        use: 'html-loader'
      },
      {
        test: /\.(css|less)$/i,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../dist/file-img'
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
  resolve: {
    alias: {
      '@api': path.join(__dirname, '../src/core/http/api')
    }
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
}

