const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = 'development'

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  target: "electron-renderer",
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
  devServer: {
    port: 9080,
    contentBase: './src/RendererProcess',
  },
  module: {
    rules: [
      {
        test: /\.(tsx|js)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          }
        ],
      },
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
      },
      {
        test: /\.(png|svg|jpe?g|gif|webp)(\?.*)?$/,
        type: 'asset/resource'
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'], //webpack 扩展 可以解析的 模块
    alias: {
      '@api': path.join(__dirname, '../src/Service/ApiService')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/RendererProcess/public/index.html'),
    }),
  ]
};
