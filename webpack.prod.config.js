// In webpack.prod.config.js
// This file contains the configuration needed by Webpack to compile the sources to bundle.js

const webpack = require('webpack');

// The path module provides utilities for working with file
//  and directory paths. It can be accessed using:
// See: https://nodejs.org/docs/latest/api/path.html
const path = require('path');

function assetsPath(_path) {
  return path.posix.join(_path);
};

module.exports = {
  devtool: 'inline-source-map',
  entry: [
		'./src/index.js'
  ],

  // Production details
  output: {
    // When compiled for production, output file location
		path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js' // Its convention to use this name
  },

  // Bundle lookup dir for included/imported modules
  // By default, bundler/webpack with search here for the scripts
  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {
    loaders: [
			{
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
			},
			{
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('img/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        },
      },
        // I am using SASS as Transpiler for style sheets
      {test: /\.scss$/, loaders: ["style-loader", "css-loader", "sass-loader"]},

    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        // This tells the Webpack and Babel for optimization for performance
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
};