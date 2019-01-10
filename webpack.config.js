const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = () => process.env.NODE_ENV.trim() === 'development'

const isProd = () => process.env.NODE_ENV.trim() === 'production'

const minify = {
  removeComments: true,
  collapseWhitespace: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeStyleLinkTypeAttributes: true,
  keepClosingSlash: true,
  minifyJS: true,
  minifyCSS: true,
  minifyURLs: true
}

const config = {
  mode: isProd() ? 'production' : 'development',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: isProd() ? '[name].[chunkhash:8].js' : '[name].js',
    chunkFilename: isProd()
      ? '[name].chunk.[chunkhash:8].js'
      : '[name].chunk.js',
    publicPath: isProd() ? './dist/' : '/'
  },
  devtool: isProd() ? false : 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          isProd()
            ? { loader: MiniCssExtractPlugin.loader }
            : { loader: 'style-loader' },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '/static/img/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: isDev(),
      __PROD__: isProd(),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV.trim())
    }),
    new MiniCssExtractPlugin(
      isProd()
        ? '[name].css'
        : {
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
          }
    ),
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index.html',
      template: 'index.html',
      minify: isProd() ? minify : {}
    })
  ]
}

if (isDev()) {
  config.devServer = {
    open: true,
    contentBase: path.join(__dirname, 'dist'),
    host: 'localhost',
    port: 1215,
    clientLogLevel: 'warning',
    compress: true,
    //quiet: true
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
} else {
  config.optimization = {}
}
module.exports = config
