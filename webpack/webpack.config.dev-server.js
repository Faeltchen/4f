var path = require('path');
var webpack = require('webpack');

var commonConfig = require('./common.config');

var commonLoaders = commonConfig.commonLoaders;
var publicPath = commonConfig.output.publicPath;
var externals = commonConfig.externals;
var postCSSConfig = commonConfig.postCSSConfig;
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var app_dir = path.resolve(__dirname);
module.exports = {
    // The configuration for the server-side rendering
    name: 'server-side rendering',
    context: path.join(__dirname, '..', 'app'),
    entry: {
      server: '../server/index'
    },
    target: 'node',
    node: {
      __dirname: false
    },
    devtool: 'sourcemap',
    output: {
      // The output directory as absolute path
      path: path.join(__dirname, '..', 'compiled'),
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: '[name].dev.js',
      // The output path from the view of the Javascript
      publicPath: publicPath,
      libraryTarget: 'commonjs2'
    },
    module: {
      loaders: commonLoaders.concat(
        {
          test: /\.(scss|css)$/,
          loader: ExtractTextPlugin.extract(
              'style-loader',
              'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass?' +
              'postcss-loader'
          )
        },
        {
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=application/font-woff'
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=application/octet-stream'
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file'
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=image/svg+xml'
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.json$/,
          use: 'json-loader'
        }
      )
    },
    resolve: {
      root: [path.join(__dirname, '..', 'app')],
      extensions: ['', '.js', '.jsx', '.css'],
    },
    externals: externals,
    plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new webpack.IgnorePlugin(/vertx/),
        new webpack.BannerPlugin(
          'require("source-map-support").install();',
          { raw: true, entryOnly: false }
        ),
        new ExtractTextPlugin("style.css", {
            allChunks: true
        }),
    ],
    postcss: postCSSConfig
};
