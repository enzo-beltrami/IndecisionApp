const path = require("path");
const publicFolder = path.join(__dirname, "public");

module.exports = {
  entry: "./src/app.js",
  output: {
    path: publicFolder,
    filename: "bundle.js"
  }
};
