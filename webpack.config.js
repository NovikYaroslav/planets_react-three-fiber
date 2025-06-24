const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

module.exports = {
  entry: { myApp: path.resolve(__dirname, './src/index.js') },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: production ? '[name].[contenthash].js' : '[name].js',
    publicPath: '/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg|jpeg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/images/[name].[hash][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[name].[hash][ext]',
        },
      },
      {
        test: /\.(gltf|glb|bin)$/,
        type: 'asset/resource',
        generator: {
          filename: 'models/[path][name][ext]',
        },
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /node_modules/,
        use: [
          production ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: !production,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !production,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.*', '.js', '.jsx', '.scss'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Planets VR Gallery',
      template: './src/index.html',
      favicon: './public/favicon.ico',
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: production
        ? 'static/css/[name].[contenthash].css'
        : '[name].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public/models',
          to: 'models',
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
  devServer: {
    port: 3002,
    hot: true,
    open: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
  },
  mode: production ? 'production' : 'development',
};
