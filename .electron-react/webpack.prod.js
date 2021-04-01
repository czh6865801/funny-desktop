const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //打包前清空build目录文件
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

process.env.NODE_ENV === 'production'

module.exports = smp.wrap({
  mode: 'production',
  devtool: 'source-map',
  target: "electron-main",
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
  devServer: {
    contentBase: './src/RendererProcess',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
              ],
            },
          },
        ],
      },
    ],
  },
  cache: {
    // 使用持久化缓存
    type: "filesystem", //memory:使用内容缓存 filesystem：使用文件缓存
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/RendererProcess/public/index.html'),
    }),
    new CleanWebpackPlugin()
  ]
})

