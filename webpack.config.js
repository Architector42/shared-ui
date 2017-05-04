const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';

if (NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    })
  );
}

module.exports = {
  context: __dirname + '/src',

  entry: {
    index: './index'
  },

  output: {
    path: __dirname + '/example',
    publicPath: '/',
    filename: 'shared-ui.js'
  },

  devtool: NODE_ENV === 'development' ? 'cheap-module-inline-source-map' : false,
  watch: true,

  resolve: {
    modules: ['node_modules'],
    extensions: ['*', '.js', '.jsx']
  },

  resolveLoader: {
    modules: ['node_modules'],
    moduleExtensions: ['-loader'],
    extensions: ['*', '.js', '.jsx']
  },

  plugins: [
    new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(NODE_ENV)
    }),

    new webpack.HotModuleReplacementPlugin()
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          "eslint-loader",
        ],
      },

      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ],

    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel'
    }]
  },

  devServer: {
    contentBase: __dirname + '/example',
    host: 'localhost',
    port: '3001',
    hot: true
  } 
};