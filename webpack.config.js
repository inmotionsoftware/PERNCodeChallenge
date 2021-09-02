const path = require('path');

const outputDirectory = 'dist/';

module.exports = {
  entry: ['babel-polyfill', './src/frontend/index.jsx'],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader',
      options: {
        limit: 100000
      }
    },
    {
      test: /\.html$/,
      use: 'html-loader'
    }]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    host: '0.0.0.0',
    contentBase: './dist',
    publicPath: "./src/frontend",
    port: 3000,
    open: true,
    historyApiFallback: true,
    disableHostCheck: true,
    proxy: {
      '/api': 'http://localhost:8080'
    },
  }
};
