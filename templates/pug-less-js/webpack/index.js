const {merge} = require('webpack-merge');

const baseConfig = require('./webpack.base');
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');

module.exports = (env = {}, argv = {}) => {
  const isDev = argv.mode === 'development';

  return merge(
    baseConfig(env),
    isDev ? devConfig(env) : prodConfig(env)
  );
};
