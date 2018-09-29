const path = require("path");
const publicFolder = path.join(__dirname, "public");

module.exports = {
  entry: "./src/app.js",
  output: {
    path: publicFolder,
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  },
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: publicFolder
  }
};
