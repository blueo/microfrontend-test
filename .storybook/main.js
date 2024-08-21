const path = require("path");
const globImporter = require('node-sass-glob-importer');
module.exports = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-a11y"],
  core: {
    builder: "webpack5",
  },
  // Add static directories for files refrenced in stories
  // e.g.
  // <img src="/dist/images/logo.png" alt="Organisation logo"/>
  staticDirs: [
    { from: './public', to: '/'}, // support for msw as service worker must be at root
    { from: '../themes/app/dist', to: '/dist' },
    { from: '../themes/app/dist', to: '/_resources/themes/app/dist'},
    { from: '../themes/app/src', to: '/src' },
    { from: '../stories/assets', to: '/assets' },
  ],
  webpackFinal: async config => {
    // Webpack configuration replacements
    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", {
        loader: "sass-loader",
        options: {
          // override the variables set in the application SCSS
          additionalData: "$icon-path: '../icons'; $font-path: '../fonts'; $image-path: '../images';",
          sassOptions: {
            // Allow SCSS import wildcards
            importer: globImporter()
          }
        }
      }],
      include: path.resolve(__dirname, "../")
    });

    // Add path aliases used when importing components or files
    // e.g.
    // import Button from '@src/js/components/Button.vue'
    config.resolve.alias = {
      ...config.resolve.alias,
      "@dist": path.resolve(__dirname, "../themes/app/dist/"),
      "@src": path.resolve(__dirname, "../themes/app/src/"),
      "@assets": path.resolve(__dirname, "../stories/assets/")
    };

    // Return the altered config
    return config;
  },
  framework: {
    name: "@storybook/vue3-webpack5",
    options: {}
  },
  docs: {
    autodocs: false
  },
  disableTelemetry: true
};
