// karma.conf.cjs
module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],

    files: [
      "src/setupTests.js", // configuración inicial (RTL, matchers, cleanup)
      "src/**/*.spec.js",
      "src/**/*.spec.jsx",
    ],

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
                  [
                    "@babel/preset-react",
                    { runtime: "automatic", development: true },
                  ],
                ],
              },
            },
          },
          {
            // ✅ Regla para imágenes (mantiene compatibilidad con fetch local)
            test: /\.(png|jpe?g|gif|webp|svg)$/i,
            type: "asset/inline",
          },
          {
            // ✅ Regla clave para evitar el error con .css
            test: /\.css$/i,
            use: ["null-loader"], // ignora estilos durante los tests
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
      suppressPassed: false, // muestra los passed
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

    browsers: ["ChromeHeadless"], // sin interfaz, ideal para CI/CD o scripts
    singleRun: true,
    colors: true,
    logLevel: config.LOG_INFO,
  });
};
