var path = require('path');
var webpack = require('webpack');
var env = process.env.NODE_ENV;

var config = {
  entry: [
    './demo/index'
  ],
  output: {
    path: path.join(__dirname, 'demo'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin()
  ],
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: [
        path.join(__dirname, 'demo'),
        path.join(__dirname, 'src')
      ]
    },{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }]
  }
};

if (env !== 'production') {
  // etc.
}

module.exports = config;
