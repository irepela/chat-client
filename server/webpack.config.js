const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: "./server/app.ts",
  target: "node",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  output: {
    path: path.join(__dirname, "../dist/server"),
    filename: "app.js"
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin(),
    ],
    minimize: false
  }
};
