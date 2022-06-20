/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path')

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const common = require('./webpack.common')

module.exports = merge(common, {
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'build'),
    },
    port: 4000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin({ overlay: false })],
})
