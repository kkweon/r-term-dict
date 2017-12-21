const path = require("path");

const OUTPUT_DIR = "public";

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, OUTPUT_DIR),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: {
          loader: "elm-webpack-loader",
          options: {},
        },
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, OUTPUT_DIR),
    compress: true,
    port: 9000,
    open: true,
  },
};
