module.exports = () => {
  return {
    test: /\.(css|sass|scss)$/,
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
      {
        loader: 'sass-loader',
      }
    ],
  };
};
