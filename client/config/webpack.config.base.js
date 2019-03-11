const path = require('path');

const isDev = process.env.NODE_ENV.trim() === 'development';

const isProd = process.env.NODE_ENV.trim() === 'production';

const config = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? '#cheap-module-source-map' : false,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: isDev ? '[name].js' : '[name].[hash:8].js',
    // chunkFilename: isProd ? '[name].chunk.[contenthash:8].js' : '[name].chunk.js',
    publicPath: isDev ? '/' : '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.styl'],
  },
  devServer: {
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
  },
  optimization: {
    // runtimeChunk: 'single',
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      minChunks: 1,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module, chunks, chcheGroupKey) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            return `vender/${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
  module: {
    rules: [
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
};

module.exports = config;
