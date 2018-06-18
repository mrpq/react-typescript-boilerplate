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

const autoprefix = () => ({
  loader: "postcss-loader",
  options: {
    plugins: [require("autoprefixer")]
  }
});

exports.autoprefix = autoprefix;

exports.loadCSS = ({ include, exclude } = {}) => {
  const loaders = (options = { "css-loader": { modules: false } }) => [
    { loader: "style-loader" },
    {
      loader: "css-loader",
      options: { sourceMap: true, ...options["css-loader"] }
    }
  ];

  return {
    module: {
      rules: [
        // regular css
        {
          test: /\.css$/,
          include,
          exclude: [/\.module\./],
          use: loaders()
        },
        {
          test: /\.s(a|c)ss$/,
          include,
          exclude: /\.module\./,
          use: loaders().concat({
            loader: "sass-loader",
            options: { sourceMap: true }
          })
        },
        // css-modules
        {
          test: /\.module\.css$/,
          include,
          exclude,
          use: loaders({ "css-loader": { modules: true } })
        },
        {
          test: /\.module\.s(a|c)ss$/,
          include,
          exclude,
          use: loaders({ "css-loader": { modules: true } }).concat({
            loader: "sass-loader",
            options: { sourceMap: true }
          })
        }
      ]
    }
  };
};
