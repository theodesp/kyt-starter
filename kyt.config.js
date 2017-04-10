const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
// Base kyt config.
// Edit these properties to make changes.

module.exports = {
  debug: true,
  modifyWebpackConfig: (baseConfig, options) => {
    baseConfig.entry.commons = ['moment']

    baseConfig.plugins.push(
      new ProgressBarPlugin({clear: false})
    );

    baseConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
      name: "commons",
      filename: "commons.js",
      minChunks: Infinity,
    }))

    return baseConfig;
  }
};
