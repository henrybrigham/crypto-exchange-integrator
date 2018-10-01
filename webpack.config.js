const path = require('path');
const webpack = require('webpack');
function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

function assetsPath(_path) {
  return path.posix.join(_path);
};

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
		path: __dirname + '/dist',
		publicPath: '/',
    filename: 'bundle.js'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    })
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  },
  module: {
    loaders: [
			{
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
			{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        },
			},
			{
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('img/[name].[hash:7].[ext]'),
        },
      },
		]
	},
  resolve: {
    extensions: ['.js', '.jsx']
  }
};