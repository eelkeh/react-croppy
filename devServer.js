var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.dev.config.js');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './demo/index.html'));
});

app.use(express.static('demo'));

app.listen(3002, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:3002');
});
