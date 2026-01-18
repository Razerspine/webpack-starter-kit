const path = require('path');
const PugPlugin = require('pug-plugin');

require('dotenv').config();

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';

  const config = {
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'inline-source-map' : 'source-map',

    output: {
      path: path.join(__dirname, 'dist'), clean: true,
    },

    resolve: {
      alias: {
        '@views': path.join(__dirname, 'src/views/'),
        '@styles': path.join(__dirname, 'src/assets/styles/'),
        '@scripts': path.join(__dirname, 'src/assets/scripts/'),
        '@fonts': path.join(__dirname, 'src/assets/fonts/'),
        '@images': path.join(__dirname, 'src/assets/images/'),
        '@icons': path.join(__dirname, 'src/assets/icons/'),
      },
    },

    plugins: [
      new PugPlugin({
        entry: 'src/views/pages/',
        // modify output filename of generated html as you want
        filename: ({chunk}) => {
          let [name] = chunk.name.split('/');
          if (name === 'home') name = 'index';
          return `${name}.html`;
        },

        js: {
          filename: 'js/[name].[contenthash:8].js',
          //inline: true, // inlines JS into HTML
        },

        css: {
          filename: 'css/[name].[contenthash:8].css',
          //inline: true, // inlines CSS into HTML
        },

        preprocessorOptions: {
          embedFilters: {
            escape: true,
            code: {
              className: 'language-',
            },
            highlight: {
              use: 'prismjs',
              verbose: isDev,
            }
          },
        },
      }),
    ],

    module: {
      rules: [
        {
          test: /\.(css|sass|scss)$/,
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: ['autoprefixer']
                }
              }
            },
            'sass-loader'
          ]
        },

        {
          test: /\.(png|jpe?g|svg|webp|ico)$/i,
          oneOf: [
            {
              resourceQuery: /inline/, type: 'asset/inline',
            },
            {
              type: 'asset', parser: {
                dataUrlCondition: {
                  maxSize: 2048,
                },
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
            filename: 'fonts/[name][ext][query]'
          },
        },

        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },

        {
          test: /\.webmanifest$/i,
          type: 'asset/resource',
          generator: {
            filename: 'favicons/[name][ext]'
          }
        }
      ],
    },

    performance: {
      hints: isDev ? 'warning' : 'error',
      // in development mode the size of entrypoint and assets is bigger than in production
      maxEntrypointSize: (isDev ? 15000 : 5000) * 1024,
      maxAssetSize: (isDev ? 10000 : 5000) * 1024,
    },

    stats: {
      colors: true,
      preset: isDev ? 'minimal' : 'errors-only',
      loggingDebug: isDev ? ['sass-loader'] : [],
    },
  };

  if (isDev) {
    config.devServer = {
      static: path.join(process.cwd(), './dist'),

      watchFiles: {
        paths: ['src/**/*.*', 'README.md'],
        options: {
          usePolling: true,
        },
      },
      open: true,
      compress: true,

      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp',
      },

      historyApiFallback: {
        rewrites: [
          {from: /^\/$/, to: '/index.html'},
          {from: /./, to: '/404.html'},
        ],
      },
    };

    config.watchOptions = {
      ignored: ['**/node_modules'],
    };
  }

  return config;
};
