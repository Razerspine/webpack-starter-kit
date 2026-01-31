const PugPlugin = require('pug-plugin');

module.exports = () => {
  return {
    plugins: [
      new PugPlugin({
        entry: 'src/views/pages/',
        filename: ({ chunk }) => {
          let [name] = chunk.name.split('/');
          if (name === 'home') name = 'index';
          return `${name}.html`;
        },
        js: {
          filename: 'js/[name].[contenthash:8].js',
        },
        css: {
          filename: 'css/[name].[contenthash:8].css',
        },
      }),
    ],
    moduleRules: [],
  };
};
