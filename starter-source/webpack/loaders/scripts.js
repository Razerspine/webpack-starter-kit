module.exports = (env = {}) => {
  const useTS = env.scripts === 'ts';

  if (useTS) {
    return {
      test: /\.ts$/,
      exclude: /node_modules/,
      use: {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    };
  }

  // default: JS
  return {
    test: /\.m?js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
    },
  };
};
