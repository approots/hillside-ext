const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const PATHS = {
  root: path.join(__dirname),
  src: path.join(__dirname, "src"),
  build: path.join(__dirname, "build"),
  static: path.join(__dirname, "static")
};

module.exports = {
  entry: {
    content: PATHS.src + '/content',
    popup: PATHS.src + '/popup',
    background: PATHS.src + '/background'
  },
  output: {
    path: PATHS.build,
    filename: "[name].js"
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
    ],
  },
  // context: PATHS.root,
  plugins: [
    new CopyWebpackPlugin([
        { from: 'static' }
    ])
  ]
};
