/**
 * @type {import('webpack').Configuration}
 */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  // mode: "development",
  mode: "production",
  // devtool: 'eval-cheap-module-source-map',
  devtool: 'nosources-source-map',
  devServer: {
    port: 9000,
    open: false,
    proxy: {
      '/api': {
        target: 'http://81.69.30.202:7001',
        changeOrigin: true
      }
    },
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
  entry: {
    main: "./src/index.tsx",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node-modules/,
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          cacheCompression: false,
        },
      },
      {
        test: /\.(eot|svg|ttf|woff)$/,
        use: {
          loader: "file-loader",
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin(),
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: './',
  },
};
