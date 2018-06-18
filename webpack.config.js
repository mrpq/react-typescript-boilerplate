const merge = require("webpack-merge");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const PATHS = {
  root: path.resolve(__dirname),
  app: path.resolve(path.join(__dirname, "src"))
};

const commonConfig = merge([
  {
    entry: path.join(PATHS.app, "index.js"),
    output: {
      filename: "index.js",
      path: path.join(PATHS.root, "./dist")
    }
  },
  {
    plugins: [
      new HtmlWebpackPlugin({
        // Required
        inject: false,
        template: require("html-webpack-template"),
        // Optional - https://github.com/jaketrent/html-webpack-template
        // много дополнительных полей для темплейта генерируемого index.html
        appMountId: "root"
      })
    ]
  }
]);
const productionConfig = merge([]);
const developmentConfig = merge([commonConfig]);

module.exports = (mode) => {
  if (mode === "production") {
    return merge([commonConfig, productionConfig]);
  }

  if (mode === "development") {
    return merge([commonConfig, developmentConfig]);
  }
};
