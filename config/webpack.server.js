'use strict';
const resolve = require('resolve');
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const webpack = require("webpack");

const coreConfig = require('./webpack.config')

module.exports = {
  watch: true,
  ...coreConfig,
  entry: "./server/server.js",
  output:{
    path: path.resolve(__dirname, "../", 'build'),
    filename:'server_bundle.js',
    publicPath: '/'
  },
  target: 'node',
  externals: [ nodeExternals() ],
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false,
  },
}

