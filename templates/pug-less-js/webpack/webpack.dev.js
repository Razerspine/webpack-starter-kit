const path = require('path');

module.exports = () => ({
  mode: 'development',
  devtool: 'inline-source-map',

  devServer: {
    static: path.join(process.cwd(), 'dist'),
    open: true,
    compress: true,
    watchFiles: ['src/**/*'],
  },
});
