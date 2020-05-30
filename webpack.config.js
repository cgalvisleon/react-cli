const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    utilities: './src/utilities.js',
  },
  output: {
    path: path.resolve(__dirname),
    filename: 'utilities.js',
  },
  node: { fs: 'empty' },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
      },
    ],
  },
  plugins: [new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true })],
  mode: 'development',
};
