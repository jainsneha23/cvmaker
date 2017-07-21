/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import WebpackAssetsManifest from 'webpack-assets-manifest';
import path from 'path';

const bundleHashType = 'chunkhash'; // aggregate of all chunks, specific hash per chunk

module.exports = {
  devtool: '#inline-source-map',
  target: 'web',
  entry: {
    main: './web/clientRenderer.js',
    vendor: [
      'es6-promise',
      'isomorphic-fetch',
      'react',
      'react-dom',
      'react-router'
    ]
  },
  output: {
    path: path.join(__dirname, '../public'),
    publicPath: '/',
    filename: `[name]-[${bundleHashType}].js`
  },
  node: {
    module: 'empty',
    fs: 'empty'
  },
  resolve: {
    modules: [
      'node_modules'
    ]
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: [/node_modules/, /dist/],
      use: [{
        loader: 'babel-loader',
        query: {
          presets: [['es2015', { modules: false }], 'react'],
          plugins: [
            ['transform-es2015-classes', {loose: true}]
          ]
        }
      }],
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    }, {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          { loader: 'css-loader'  }, 'less-loader'
        ]
      })
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      use: [{ loader: 'file-loader', options: { name: 'fonts/[name]-[hash].[ext]' } }]
    }]
  },
  plugins: [
    new webpack.IgnorePlugin(/require-text/),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: `vendor-[${bundleHashType}].js`
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        context: '/',
        debug: true
      }
    }),
    new CleanWebpackPlugin([path.join(__dirname, '../public')], {
      root: `${__dirname}/../`,
      verbose: true,
      dry: false,
      exclude: ['fonts']
    }),
    new ExtractTextPlugin({
      filename: 'main-[contenthash].css'
    }),
    new WebpackAssetsManifest({ output: '../build-manifest.json' }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      sourceMap: true,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true,
        warnings: false
      },
      comments: false
    })
  ],
  performance: {
    hints: 'warning'
  },
  stats: {
    children: false,
    assets: true,
    warnings: true
  }
};
