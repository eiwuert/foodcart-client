const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPluin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const env = require('dotenv').config();

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].[contenthash].js',
    publicPath:
      env.parsed.REACT_APP_ENV === 'prod'
        ? env.parsed.REACT_APP_HOST + '/'
        : '/'
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, './src/assets/'),
      components: path.resolve(__dirname, './src/components/'),
      context: path.resolve(__dirname, './src/context/'),
      reducer: path.resolve(__dirname, './src/reducer/'),
      theme: path.resolve(__dirname, './src/theme/'),
      types: path.resolve(__dirname, './src/types/'),
      views: path.resolve(__dirname, './src/views/')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  devServer: {
    contentBase: './dist'
  },
  optimization: {
    minimize: true
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /@material-ui\/lab\/esm\/Autocomplete\/Autocomplete\.js/,
      '../../../../../src/components/Autocomplete/Autocomplete.js'
    ),    
    new HtmlWebpackPluin({
      favicon: './public/favicon.ico',
      template: './public/index.html',
      filename:
        env.parsed.REACT_APP_ENV === 'prod' ? 'app.blade.php' : 'index.html'
    }),
    new PreloadWebpackPlugin(),
    new WebpackPwaManifest({
      fingerprints: false,
      display: 'standalone',
      name: env.parsed.RESTAURANT_NAME,
      short_name: env.parsed.RESTAURANT_SHORT_NAME,
      start_url: '/',
      theme_color: env.parsed.RESTAURANT_THEME_COLOR,
      background_color: env.parsed.RESTAURANT_BACKGROUND_COLOR,
      icons: [
        {
          src: path.resolve('public/icon.png'),
          sizes: [96, 128, 192, 256, 256, 512]
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new Dotenv(),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
  ]
};
