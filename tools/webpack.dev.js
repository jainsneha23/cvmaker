/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import path from 'path';

module.exports = {
  devtool: '#inline-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './web/index.js'
  ],
  output: {
    path: path.join(__dirname, '../public'),
    publicPath: '/',
    filename: 'main.js'
  },
  devServer: {
    contentBase: './src',
    stats: 'errors-only'
  },
  node: {
    module: 'empty',
    fs: 'empty'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: [{ loader: 'babel-loader' }]
    }, {
      test: /\.css$/,
      use: [{ loader: 'style-loader' },
        { loader: 'css-loader' }
      ]
    }, {
      test: /\.less$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'less-loader'
      }]
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      use: [{ loader: 'file-loader', options: { name: 'fonts/[name]-[hash].[ext]' } }]
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        debug: true,
        noInfo: true,
        colors: true,
      }
    })
  ],
  stats: {
    children: false // prevent outputs from child plugins like from extract-text-plugin
  },
  /* will always resolve from local and prevent addition of duplicate dependencies */
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react')
    }
  }
};
