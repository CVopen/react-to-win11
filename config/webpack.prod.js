/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-require-imports */
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const chalk = require('chalk')
const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')

const common = require('./webpack.common')

module.exports = merge(common, {
  optimization: {
    chunkIds: 'deterministic',
    moduleIds: 'deterministic',
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
        },
      },
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        test: /\.js(\?.*)?$/i,
        extractComments: false,
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash].css',
    }),
    new CleanWebpackPlugin(),
    new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`,
    }),
  ],
})
