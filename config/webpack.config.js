'use strict';
const resolve = require('resolve');
const path = require("path");
const webpack = require("webpack");
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const LoadablePlugin = require('@loadable/webpack-plugin')

const host = process.env.HOST || "0.0.0.0"

module.exports = {
  mode: "development",
  devtool: 'cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, "../", "build"),
    pathinfo: true,
    filename: 'static/js/[name].js',
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: 'static/js/[name].chunk.js',
    // This is the URL that app is served from. We use "/" in development.
    publicPath: '/',
    hotUpdateChunkFilename: 'static/[id].[hash].hot-update.js',
    hotUpdateMainFilename: 'static/[hash].hot-update.json',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      { 
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options:{
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-transform-runtime",
            "@babel/plugin-transform-spread",
            "@loadable/babel-plugin"
          ],
          cacheDirectory: true,
        }
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [ 
          { 
            loader: miniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true
            }
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(svg||woff2||woff||less||ttf||eot)$/,
        loader :"file-loader",
        options: {
          name: 'static/fonts/[name].[hash:8].[ext]',
        },
      }
    ]
  },

  plugins: [
    new LoadablePlugin(),
    new miniCssExtractPlugin({
      filename: 'static/css/[name].css',
      chunkFilename: 'static/css/[id].css'
    })
  ]
};
