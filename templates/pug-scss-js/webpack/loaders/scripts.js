module.exports = () => {
  return {
    test: /\.m?js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
    },
  };
};
