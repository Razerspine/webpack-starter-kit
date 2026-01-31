const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PugPlugin = require('pug-plugin');

module.exports = (env = {}) => {
  const useHtml = env.templates === 'html';

  if (useHtml) {
    return {
      plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(process.cwd(), 'src/pages/index.html'),
          filename: 'index.html',
        }),
      ],
      moduleRules: [
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
      ],
    };
  }

  // default: PUG
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
