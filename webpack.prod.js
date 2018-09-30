const commonConfig = require("./webpack.common");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");

module.exports = webpackMerge(commonConfig, {
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.jsx?$/,
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { minimize: true } },
          "sass-loader"
        ]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),

    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: { screw_ie8: true, keep_fnames: true }, // eslint-disable-line camelcase
      compress: { screw_ie8: true }, // eslint-disable-line camelcase
      comments: false
    })
  ]
});
