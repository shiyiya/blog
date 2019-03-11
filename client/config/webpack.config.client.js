const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseWebpackConfig = require('./webpack.config.base');

const isDev = process.env.NODE_ENV.trim() === 'development';

const isProd = process.env.NODE_ENV.trim() === 'production';

const minify = {
  // removeComments: true,
  collapseWhitespace: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeStyleLinkTypeAttributes: true,
  keepClosingSlash: true,
  minifyJS: true,
  minifyCSS: true,
  minifyURLs: true,
};

const config = merge(baseWebpackConfig, {
  entry: [
    'react-hot-loader/patch',
    path.resolve(__dirname, '../src/entry-client.js'),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true,
          useEslintrc: true,
        },
      },
      {
        test: /\.css$/,
        use: [
          isDev
            ? { loader: 'style-loader' }
            : { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.styl$/,
        use: [
          isDev
            ? { loader: 'style-loader' }
            : { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
          },
          {
            loader: 'stylus-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 2048,
          name: '/static/img/[name].[contenthash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV.trim()),
        __DEV__: isDev,
        BASE_API: isDev ? "'/api'" : "''",
      },
    }),
    new MiniCssExtractPlugin(
      isDev
        ? '[name].css'
        : {
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
          }
    ),
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index.html',
      template: 'index.html',
      minify: isDev ? {} : minify,
    }),
  ],
});

if (isDev) {
  config.plugins.push(
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  );
}

module.exports = config;
