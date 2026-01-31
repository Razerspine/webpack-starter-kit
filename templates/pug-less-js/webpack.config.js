const createConfig = require('./webpack');

module.exports = (env = {}, argv = {}) => {
  return createConfig(env, argv);
};
