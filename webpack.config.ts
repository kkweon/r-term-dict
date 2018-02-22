import * as path from "path";
import { resolve } from "url";
import * as webpack from "webpack";

const config: webpack.Configuration = {
  entry: "./src/client/index.tsx",

  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "src/server/public/"),
  },

  devtool: "source-map",

  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "awesome-typescript-loader",
      },
    ],
  },
};

export default config;
