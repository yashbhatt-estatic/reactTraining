/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import open from 'open';
import config from './webpack.config';

// template! https://github.com/webpack/webpack-dev-server/blob/master/examples/node-api-simple/server.js

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
  contentBase: '../dist/',
  stats: {
    colors: true,
  },
});

server.listen(3000, '127.0.0.1', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Dev Server listening on port 3000!\n');
    open('http://localhost:3000');
  }
});
