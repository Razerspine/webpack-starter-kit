module.exports = (env = {}) => {
  const useLess = env.styles === 'less';

  const preProcessorLoader = useLess ? {
    loader: 'less-loader',
    options: {
      lessOptions: {
        javascriptEnabled: true,
      },
    },
  } : {
    loader: 'sass-loader',
  };

  const test = useLess ? /\.(css|less)$/ : /\.(css|sass|scss)$/;

  return {
    test,
    use: [
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: ['autoprefixer'],
          },
        },
      },
      preProcessorLoader,
    ],
  };
};
