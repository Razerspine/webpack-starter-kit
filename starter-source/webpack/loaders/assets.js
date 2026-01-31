module.exports = () => ({
  oneOf: [
    {
      test: /\.(png|jpe?g|svg|webp|ico)$/i,
      oneOf: [
        {
          resourceQuery: /inline/,
          type: 'asset/inline',
        },
        {
          type: 'asset',
          parser: {
            dataUrlCondition: {maxSize: 2048},
          },
          generator: {
            filename: 'img/[name].[hash:8][ext]',
          },
        },
      ],
    },
    {
      test: /\.(woff(2)?|ttf|otf|eot|svg)$/,
      type: 'asset/resource',
      include: /assets\/fonts|node_modules/,
      generator: {
        filename: 'fonts/[name][ext][query]',
      },
    },
    {
      test: /\.webmanifest$/i,
      type: 'asset/resource',
      generator: {
        filename: 'favicons/[name][ext]',
      },
    },
  ],
});
