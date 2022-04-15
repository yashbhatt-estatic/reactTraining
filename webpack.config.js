const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HotModuleReplacementPlugin, NoEmitOnErrorsPlugin, ProvidePlugin } = require('webpack');
const Dotenv = require('dotenv-webpack');
const { getThemeVariables } = require('antd/dist/theme');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
      favicon: './src/components/Layout/Header/assets/theOne.png',
    }),
    new HotModuleReplacementPlugin(),
    new NoEmitOnErrorsPlugin(),
    new ProvidePlugin({
      process: 'process/browser',
    }),
    new Dotenv(),
  ],
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            cacheCompression: false,
            envName: 'production',
          },
        },
      },
      {
        test: /\.(svg|png|jpg|gif|ico)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'imgs',
          },
        },
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'less-loader',
          options: {
            lessOptions: {
              modifyVars: getThemeVariables({
                dark: true, // Enable dark mode
                compact: true, // Enable compact mode
              }),
              javascriptEnabled: true,
            },
          },
        }],
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: [
          'file-loader?name=[name].[ext]&outputPath=portal/content/json',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg'],
  },
};
