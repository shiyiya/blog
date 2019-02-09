const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = () => process.env.NODE_ENV.trim() === 'development';

const isProd = () => process.env.NODE_ENV.trim() === 'production';

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
  minifyURLs: true,
};

const config = {
  mode: isProd() ? 'production' : 'development',
  entry: ['react-hot-loader/patch', path.resolve(__dirname, './src/index.js')],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: isProd() ? '[name].[chunkhash:8].js' : '[name].js',
    chunkFilename: isProd()
      ? '[name].chunk.[chunkhash:8].js'
      : '[name].chunk.js',
    publicPath: isDev() ? '/' : '/',
  },
  devtool: isProd() ? false : 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.styl'],
  },
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
          isProd()
            ? { loader: MiniCssExtractPlugin.loader }
            : { loader: 'style-loader' },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.styl$/,
        use: [
          isProd()
            ? { loader: MiniCssExtractPlugin.loader }
            : { loader: 'style-loader' },
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
          limit: 10000,
          name: '/static/img/[name].[contenthash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV.trim()),
        __DEV__: isDev(),
        __PROD__: isProd(),
        BASE_API: isDev() ? "'/api'" : "''",
      },
    }),
    new MiniCssExtractPlugin(
      isDev()
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
      minify: isDev() ? {} : minify,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

if (isDev()) {
  config.devServer = {
    open: true,
    hot: true,
    contentBase: path.join(__dirname, 'dist'),
    host: 'localhost',
    port: 1215,
    clientLogLevel: 'warning',
    compress: true,
    historyApiFallback: true,
    // quiet: true
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  };
} else {
  config.optimization = {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      minChunks: 1,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          // eslint-disable-next-line no-unused-vars
          name(module, chunks, chcheGroupKey) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            return `${packageName.replace('@', '')}`;
          },
        },
      },
    },
  };
}
module.exports = config;
