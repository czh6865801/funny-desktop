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
    assetModuleFilename: 'images/[hash][ext][query]',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(tsx|js)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          },
        ],
      },
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
      },
      {
        test: /\.(png|svg|jpe?g|gif|webp)(\?.*)?$/,
        type: 'asset/resource'
      },
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
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'], //webpack 扩展 可以解析的 模块
    alias: {
      '@api': path.join(__dirname, '../src/Service/ApiService')
    }
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
}

