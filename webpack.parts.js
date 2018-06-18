exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: "errors-only",
    host,
    port,
    open: true,
    overlay: true
  }
});

exports.generateSourceMaps = ({ type }) => ({
  devtool: type
});

exports.loadJS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include,
        exclude,
        use: ["babel-loader"]
      }
    ]
  }
});
