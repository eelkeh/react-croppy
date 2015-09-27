var webpack = require('webpack');

module.exports = {
  entry: [
    './src/index.umd'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel?stage=0'],
      exclude: '/node_modules/'
    }]
  },

  externals: [{
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  }],
  output: {
    filename: 'dist/ReactCroppy.min.js',
    libraryTarget: 'umd',
    library: 'ReactCroppy'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ]
};
