const path = require('path')
const webpack = require('webpack')

const PATHS = {
  app: path.join(__dirname, '../app/index.js'),
  build: path.join(__dirname, '../public/javascript'),
}

const common = {
  entry: [
    PATHS.app
  ],

  output: {
    path: PATHS.build,
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['', '.jsx', '.js', '.json'],
    modulesDirectories: ['node_modules', PATHS.app],
    root: [ path.resolve(path.join(__dirname, '../app')) ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/
      }, {
        test: /\.json$/,
        loaders: ['json-loader'],
      }, {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, "../app/stylesheets")]
  }
}

module.exports = common
