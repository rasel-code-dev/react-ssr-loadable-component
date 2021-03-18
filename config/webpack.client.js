'use strict';
const resolve = require('resolve');
const path = require("path");
// const HtmlWebpackPlugin = require('html-webpack-plugin')

const host = process.env.HOST || "0.0.0.0"

const coreConfig = require('./webpack.config')

module.exports = {
  ...coreConfig,
  entry: "./src/Client.js",
  devServer:{
    port:3000,
    open: false,
    // host: host,
    historyApiFallback: true,
    // for react router dom ........
    contentBase: 'public',
    // By default files from `contentBase` will not trigger a page reload.
    watchContentBase: true,
    // Enable hot reloading server. It will provide /sockjs-node/ endpoint
    // for the WebpackDevServer client so it can learn when the files were
    // updated. The WebpackDevServer client is included as an entry point
    // in the Webpack development configuration. Note that only changes
    // to CSS are currently hot reloaded. JS changes will refresh the browser.
    hot: true,
    // It is important to tell WebpackDevServer to use the same "root" path
    // as we specified in the config. In development, we always serve from /.
    // publicPath: '/',
    // WebpackDevServer is noisy by default so we emit custom message instead
    // by listening to the compiler events with `compiler.plugin` calls above.
    quiet: true,
    // Reportedly, this avoids CPU overload on some systems.
    // https://github.com/facebookincubator/create-react-app/issues/293
    watchOptions: {
      ignored: /node_modules/,
    },
    compress: true,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:4001',
    //     secure: false
    //   }
    // }
  },
  plugins: [
    ...coreConfig.plugins,
    // new HtmlWebpackPlugin({
    //   filename: "/index.html",
    //   template: 'public/index.html'
    // }),
  ]
};
