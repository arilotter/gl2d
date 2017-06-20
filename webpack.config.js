const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "./build/bundle.js",
    path: __dirname
  },
  plugins: [new HtmlWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["source-map-loader"]
      },
      {
        test: /\.(glsl|frag|vert)$/,
        use: ["raw-loader", "glslify-loader"],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".js"]
  },
  devtool: "inline-source-map",
  devServer: {
    inline: true,
    contentBase: ".",
    disableHostCheck: true
  }
};
