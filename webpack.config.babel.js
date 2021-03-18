import path from "path";
import nodeExternals from "webpack-node-externals";
import LoadablePlugin from '@loadable/webpack-plugin'
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

const clientConfig = {
  target: "web",
  name: "web",
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
  devServer: {
    port: 3000,
    historyApiFallback: true,
    contentBase: "/build",
    watchContentBase: true
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
            "@babel/plugin-transform-spread",
            '@loadable/babel-plugin'
          ],
          cacheDirectory: true
        }
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
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
    new LoadablePlugin({ filename: "static/loadable-stats.json" }), 
    new MiniCssExtractPlugin({
      filename: "static/css/[name].css",
      chunkFilename: "static/css/[name].chunk.[id].css"
    }),
    // new HtmlWebpackPlugin({
    //   filename: "index.html",
    //   template: "public/index.html"
    // })
  ]
};

const serverConfig = {
  name: 'node',
  mode: "development",
  entry: "./server/server.js",
  target: "node",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "node/server.js",
    libraryTarget:  'commonjs2',
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  externals: ['@loadable/component', nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [ 
            "@babel/preset-react",
            [
              "@babel/preset-env", { 
                useBuiltIns:  undefined,
                corejs:  false,
                targets:  { node: 'current' } ,
                modules: 'commonjs',
              }
            ],  
          ],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-transform-runtime",
            "@babel/plugin-transform-spread",
            '@loadable/babel-plugin'
          ],
          cacheDirectory: true
        }
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
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
    new MiniCssExtractPlugin({
      filename: "static/css/[name].css",
      chunkFilename: "static/css/[id].css"
    })
  ]
};


module.exports = [ serverConfig, clientConfig ]