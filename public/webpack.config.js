const webpack = require("webpack");
const path = require("path");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "static/js/[name].bundle.js",
    chunkFilename: "static/js/[name].chunk.js",
    hotUpdateChunkFilename: "static/[id].[hash].hot-update.js",
    hotUpdateMainFilename: "static/[hash].hot-update.json"
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },

  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-transform-runtime",
            "@babel/plugin-transform-spread"
          ],
          cacheDirectory: true
        }
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: miniCssExtractPlugin.loader,
            options: {
              hmr: true
              // reloadAll: true
            }
          },
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve("url-loader"),
        options: {
          limit: 10000,
          name: "static/media/[name].[hash:8].[ext]"
        }
      },
      {
        test: /\.(svg||woff2||woff||less||ttf||eot)$/,
        loader: "file-loader",
        options: {
          name: "static/fonts/[name].[hash:8].[ext]"
        }
      }
    ]
  },

  plugins: [
    new miniCssExtractPlugin({
      filename: "static/css/[name].css",
      chunkFilename: "static/css/[id].css"
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "public/index.html"
    })
  ]
};
