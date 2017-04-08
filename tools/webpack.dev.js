import webpack from 'webpack';
import path from 'path';

export default {
  debug: true,
  devtool: '#inline-source-map',
  noInfo: false,
  colors: true,
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './tools/main.js'
  ],
  target: 'web',
  output: {
    path: path.join(__dirname, '../public'),
    publicPath: '/',
    filename: 'main.js'
  },
  devServer: {
    contentBase: './src'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.jsx?$/, loaders: ['babel']},
      {test: /(\.css)$/, loaders: ['style', 'css']},
      {test: /\.less$/, loader: 'style!css!less'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ]
  }
};