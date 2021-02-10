/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");


module.exports = {
  mode:'development',
  entry: './src/js/app.js',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: "/dist/",
    inline: true,
    hot: true,
    host: "localhost",
    port: 3005
  },
  module:{
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      title: 'THREE JS'
    })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
  },

};




