const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const publicFolder = path.join(__dirname, "public");

module.exports = merge(common, {
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.jsx?$/,
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: publicFolder
  }
});
