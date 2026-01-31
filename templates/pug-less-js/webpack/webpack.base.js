const path = require('path');
const templates = require('./loaders/templates');

module.exports = (env = {}) => {
  const templatesConfig = templates(env);

  return {
    output: {
      path: path.join(process.cwd(), 'dist'),
      clean: true,
    },

    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        '@views': path.join(process.cwd(), 'src/views/'),
        '@styles': path.join(process.cwd(), 'src/assets/styles/'),
        '@scripts': path.join(process.cwd(), 'src/assets/scripts/'),
        '@fonts': path.join(process.cwd(), 'src/assets/fonts/'),
        '@images': path.join(process.cwd(), 'src/assets/images/'),
        '@icons': path.join(process.cwd(), 'src/assets/icons/'),
      },
    },

    plugins: [
      ...templatesConfig.plugins,
    ],

    module: {
      rules: [
        require('./loaders/styles')(env),
        require('./loaders/scripts')(env),
        require('./loaders/assets')(),
      ],
    },
  };
};
