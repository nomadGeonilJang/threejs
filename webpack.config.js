/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");


module.exports = {
  mode:'development',
  entry: './src/js/app.js',
  devtool: 'inline-source-map',
  devServer: {
    contentBase:path.join(__dirname, "public"), //서버가 올라갈때 사용할 퍼블릭 경로!!
    inline: true,
    hot: true,
    host: "localhost",
    port: 3005
  },
  module:{
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
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
      },
      {
        test: /\.(png|jpe?g|gif|obj|mtl)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      title: 'THREE JS',
    }),
    new CopyPlugin({
      patterns: [
        { from: "public" },
      ],
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'), //빌드 파일의 생성위치
    filename: 'js/app.js',
    // publicPath: 'http://localhost:3005', //빌드 파일 내부의 컨텐츠 기본 경로
  },
};




