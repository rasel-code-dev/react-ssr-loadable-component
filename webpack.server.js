const webpack = require('webpack');
const path = require('path');
const miniCssExtractPlugin = require('mini-css-extract-plugin')
// const LoadablePlugin = require('@loadable/webpack-plugin')
const nodeExternals = require('webpack-node-externals')


module.exports = {
  name: 'node',
  target: 'node',
  mode: 'development',
  entry: "./server/server.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "server.js",
    libraryTarget:  'commonjs2',
    // publicPath: '/',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  externals: [nodeExternals(), '@loadable/component'],

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
              // reloadAll: true
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
    // new LoadablePlugin(),
    new miniCssExtractPlugin({
      filename: 'static/css/[name].css',
      chunkFilename: 'static/css/[id].css'
    })
  ]
};
