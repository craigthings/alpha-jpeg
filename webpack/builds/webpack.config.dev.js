"use strict";
const path = require("path");
const root = path.join(__dirname, "../../");

module.exports = {
  mode: "development",
  devtool: "#source-map",
  entry: {
    demo: path.join(root, "demo", "demo"),
    alphajpeg: path.join(root, "src", "alphajpeg"),
  },

  output: {
    filename: "[name].min.js",
    path: path.join(root, "dist"),
  },
};