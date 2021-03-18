const path = require("path");
const nodeExternals = require("webpack-node-externals")
const LoadablePlugin = require('@loadable/webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");



let isDevelopment = true
if(process.env.NODE_ENV){
  isDevelopment = false
  console.log("--------- Application bundling for production ------------")
} else {
  console.log("start development server.....")
}


const optimization = {
  moduleIds: 'deterministic',
  runtimeChunk: 'single',
  splitChunks: {
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all',
      },
    },
  },
}

let commonRules = [
  {
    test: /\.(css|sass|scss)$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      "css-loader",
      "sass-loader"
    ]
  },
  // {
  //   test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
  //   loader: require.resolve("url-loader"),
  //   options: {
  //     limit: 10000,
  //     name: "static/media/[name].[hash:8].[ext]"
  //   }
  // },
  {
    test: /\.(svg||woff2||woff||less||ttf||eot)$/,
    loader: "file-loader",
    options: {
      name: "static/fonts/[name].[hash:8].[ext]"
    }
  }
]


const clientConfig = {
  target: "web",
  mode: isDevelopment ? "development": "production",
  name: "web",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: isDevelopment ? "static/js/[name].bundle.js" :  'static/js/[name].[contenthash].js',
    chunkFilename: "static/js/[name].chunk.js"
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
            "@babel/plugin-transform-runtime",
            '@loadable/babel-plugin'
          ],
          cacheDirectory: true
        }
      },
      ...commonRules,
    ]
  },

  plugins: [
    new LoadablePlugin({ filename: "static/loadable-stats.json" }), 
    new MiniCssExtractPlugin({
      filename: "static/css/[name].css",
      chunkFilename: "static/css/[name].chunk.[id].css"
    })
  ]
};

const serverConfig = {
  name: 'node',
  target: "node",
  mode: isDevelopment ? "development": "production",
  entry: "./server/main.js",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "node/[name].js",
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
            "@babel/plugin-transform-runtime",
            '@loadable/babel-plugin'
          ],
          cacheDirectory: true
        }
      },
      ...commonRules,
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "static/css/[name].css",
      chunkFilename: "static/css/[id].css"
    })
  ]
};


const resolve = {
  extensions: ["*", ".js", ".jsx"]
}


if(!isDevelopment){
  clientConfig.optimization = optimization
  clientConfig.optimization.minimize = true
} else {
  clientConfig.devtool = 'cheap-module-source-map'
  serverConfig.devtool = 'cheap-module-source-map'
}
clientConfig.resolve = resolve
serverConfig.resolve = resolve



module.exports = [ clientConfig,  serverConfig  ]