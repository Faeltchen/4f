var path = require('path');
var webpack = require('webpack');
var styleLintPlugin = require('stylelint-webpack-plugin');
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

var commonConfig = require('./common.config');
var postCSSConfig = commonConfig.postCSSConfig;
var assetsPath = commonConfig.output.assetsPath;
var publicPath = commonConfig.output.publicPath;
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var app_dir = path.resolve(__dirname);
var commonLoaders = [
  {
    /*
     * TC39 categorises proposals for babel in 4 stages
     * Read more http://babeljs.io/docs/usage/experimental/
     */
    test: /\.js$|\.jsx$/,
    loader: 'babel-loader',
    // Reason why we put this here instead of babelrc
    // https://github.com/gaearon/react-transform-hmr/issues/5#issuecomment-142313637
    query: {
      presets: ['react-hmre', 'es2015', 'react', 'stage-0'],
      plugins: ['transform-decorators-legacy']
    },
    exclude: path.join(__dirname, '..', 'node_modules')
  },
  {
    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
    loader: 'url',
    query: {
        name: '[hash].[ext]',
        limit: 10000,
    }
  }
];

module.exports = {
    node: {
        fs: "empty",
        net: "empty",
        tls: "empty"
    },
    // eval - Each module is executed with eval and //@ sourceURL.
    devtool: 'eval',
    // The configuration for the client
    name: 'browser',
    /* The entry point of the bundle
     * Entry points for multi page app could be more complex
     * A good example of entry points would be:
     * entry: {
     *   pageA: "./pageA",
     *   pageB: "./pageB",
     *   pageC: "./pageC",
     *   adminPageA: "./adminPageA",
     *   adminPageB: "./adminPageB",
     *   adminPageC: "./adminPageC"
     * }
     *
     * We can then proceed to optimize what are the common chunks
     * plugins: [
     *  new CommonsChunkPlugin("admin-commons.js", ["adminPageA", "adminPageB"]),
     *  new CommonsChunkPlugin("common.js", ["pageA", "pageB", "admin-commons.js"], 2),
     *  new CommonsChunkPlugin("c-commons.js", ["pageC", "adminPageC"]);
     * ]
     */
    context: path.join(__dirname, '..', 'app'),
    // Multiple entry with hot loader
    // https://github.com/glenjamin/webpack-hot-middleware/blob/master/example/webpack.config.multientry.js
    entry: {
      app: ['./client', hotMiddlewareScript]
    },
    output: {
      // The output directory as absolute path
      path: assetsPath,
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: '[name].js',
      // The output path from the view of the Javascript
      publicPath: publicPath
    },
    /*
    module: {
      loaders: commonLoaders.concat({
        test: /\.css$/,
        loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
      })
    },
    */
    module: {
      loaders: commonLoaders.concat(
        /*
        {
          test: /\.(scss|css)$/,
          loader: ExtractTextPlugin.extract(
              'style-loader',
              'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass?' +
              'postcss-loader'
          )
        },
        */
        {
          test: /\.(scss)$/,
          loader: 'style!css?module&localIdentName=[name]__[local]___[hash:base64:5]!sass'
        },
        { test: /\.(css)$/,
          loader: 'style!css'
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
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=image/svg+xml'
        },
      )
    },
    resolve: {
      root: [path.join(__dirname, '..', 'app')],
      extensions: ['', '.js', '.jsx', '.css', '.scss'],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new ExtractTextPlugin("style.css", {
            allChunks: true
        }),
        /*
        new webpack.optimize.UglifyJsPlugin({
          compressor: {
            warnings: false
          }
        }),
        */
        new styleLintPlugin({
          configFile: path.join(__dirname, '..', '.stylelintrc'),
          context: path.join(__dirname, '..', 'app'),
          files: '**/*.?(sa|sc|c)ss'
        })
    ],
    postcss: postCSSConfig
};
