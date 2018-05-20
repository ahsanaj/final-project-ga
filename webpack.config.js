const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = {
  entry: {
    index: "./app/js/app.js"
  },
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "dist/[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: ["babel-loader"]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ["url-loader?limit=10000", "img-loader"]
      }
    ]
  },
  devServer: {
    contentBase: "/dist"
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "./index.html",
      template: "./app/index.html",
      chunks: ["index"]
    })
  ]
};

module.exports = config;
