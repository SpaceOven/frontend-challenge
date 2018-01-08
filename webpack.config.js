const CopyWebpackPlugin = require("copy-webpack-plugin");
var webpack = require("webpack");
const path = require("path");
const buildPath = path.resolve(__dirname, "./dist");

module.exports = {
  entry: {
        app: [
          "./src/app.ts",
          "./src/app-constants.ts",
          "./src/shared/response-utils.ts",
          "./src/shared/error-dialog/error-dialog-service.ts",
          "./src/shared/loading-screen/loading-service.ts",
          "./src/components/contact/contact-api-service.ts",
          "./src/components/contact/contact-service.ts",
          "./src/components/contact/form/contact-form-controller.ts",
          "./src/components/contact/list/contact-list-controller.ts",
        ],
        vendor: [
          "angular", 
          "@uirouter/angularjs", 
          "restangular",
          "js-base64",
          "angular-animate",
          "angular-aria",
          "angular-material",
          "angular-messages",
          "angular-sanitize",
          "lodash",
        ],
      },
  output: {
    filename: "app.bundle.js",
    path: buildPath,
  },
  plugins: [
    new CopyWebpackPlugin([
        { from: "*.html", to: buildPath },
        { context: "src/components", from: "**/*.html", to: buildPath },
        { context: "src/shared", from: "**/*.html", to: buildPath },
        { context: "assets", from: "**/*.+(css|png|svg)", to: buildPath },
        { 
          context: "node_modules/angular-material", 
          from: "angular-material.min.css", 
          to: buildPath + "/css"
        }
    ]),
    new webpack.optimize.CommonsChunkPlugin({ name: "vendor", filename: "vendor.bundle.js" }),
  ],
  devServer: {
    port: 3000,
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "awesome-typescript-loader",
      }
    ],
  },
};
