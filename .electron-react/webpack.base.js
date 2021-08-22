const path = require('path');
const isDebug = process.env.NODE_ENV === 'development';

module.exports = {
  output: {
    publicPath: isDebug ? `http://localhost:9080/` : '',
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    path: path.resolve(__dirname, '../dist'),
    assetModuleFilename: 'images/[name][ext][query]',
    clean: true,
    library: {
      type: 'commonjs2'
    }
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
        test: /\.(png|svg|jpe?g|gif|webp)(\?.*)?$/,
        type: 'asset/resource'
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'], //webpack 扩展 可以解析的 模块
    alias: {
      '@Service': path.join(__dirname, '../src/Service'),
      '@RendererProcess': path.join(__dirname, '../src/RendererProcess')
    }
  }
}
