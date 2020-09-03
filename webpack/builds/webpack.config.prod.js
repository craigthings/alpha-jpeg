"use strict";
const path = require("path");
const root = path.join(__dirname, "../../");

module.exports = {
  mode: "production",
  entry: {
    alphajpeg: path.join(root, "src", "alphajpeg"),
  },

  output: {
    filename: "[name].min.js",
    path: path.join(root, "build"),
  }
};
