// karma.conf.cjs
module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],

    files: [
      // Setups primero
      "src/tests/setupJestMockPolyfill.js",
      "src/setupTests.js",

      // Tests
      "src/**/*.spec.js",
      "src/**/*.spec.jsx",

      // Servir estáticos desde /public/img (no incluir en el bundle)
      {
        pattern: "public/img/**/*",
        watched: false,
        included: false,
        served: true,
        nocache: false,
      },

      // (opcional) si mantienes una subcarpeta products, igual se sirve
      {
        pattern: "public/img/products/**/*",
        watched: false,
        included: false,
        served: true,
        nocache: false,
      },
    ],

    // Mapeos para que rutas absolutas /img/... funcionen en Karma
    proxies: {
      "/img/": "/base/public/img/",
      "/img/products/": "/base/public/img/products/",
    },

    preprocessors: {
      "src/setupTests.js": ["webpack"],
      "src/**/*.spec.js": ["webpack"],
      "src/**/*.spec.jsx": ["webpack"],
    },

    webpack: {
      mode: "development",
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-env",
                  ["@babel/preset-react", { runtime: "automatic", development: true }],
                ],
              },
            },
          },
          {
            // Importar imágenes en componentes (si alguna vez las importas)
            test: /\.(png|jpe?g|gif|webp|svg)$/i,
            type: "asset/inline",
          },
          {
            // Ignorar CSS en tests (evita errores de import)
            test: /\.css$/i,
            use: ["null-loader"],
          },
        ],
      },
      resolve: {
        extensions: [".js", ".jsx"],
      },
      devtool: "inline-source-map",
    },

    reporters: ["spec", "coverage"],

    specReporter: {
      suppressPassed: false,
      suppressSkipped: true,
      showSpecTiming: true,
    },

    plugins: [
      "karma-jasmine",
      "karma-chrome-launcher",
      "karma-webpack",
      "karma-spec-reporter",
      "karma-coverage",
    ],

    coverageReporter: {
      type: "html",
      dir: "coverage/",
    },

    browsers: ["ChromeHeadless"],
    singleRun: true,
    colors: true,
    logLevel: config.LOG_INFO,
  });
};
