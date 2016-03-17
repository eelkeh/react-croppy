var path = require('path');
var webpack = require('webpack');

module.exports = {
  //debug: true,
  devtool: 'eval',
  entry: [
    'eventsource-polyfill',
    'webpack-hot-middleware/client',
    './demo/index'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
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


