/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  entry: './src/index.tsx',
  mode: process.env.NODE_ENV,
  devtool: isDev ? 'eval-cheap-module-source-map' : 'cheap-module-source-map',
  output: {
    path: path.resolve(process.cwd(), 'build'),
    filename: 'js/[name]_[contenthash]_.js',
    assetModuleFilename: 'images/[hash][ext][query]',
    pathinfo: false,
    publicPath: isDev ? '/' : '/react-to-win11',
  },
  cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(process.cwd(), 'node_modules/.cache/webpack'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              cacheDirectory: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: /\.module\.\w+$/i,
                localIdentName: '[local]__[hash:base64:5]',
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2?)$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.jsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      title: 'react to win11',
      favicon: path.resolve(__dirname, '../public/favicon.ico'),
    }),
  ],
}
