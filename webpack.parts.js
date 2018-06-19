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
          exclude: exclude ? [/\.module\./].concat(exclude) : /\.module\./,
          use: loaders()
        },
        // regular sass
        {
          test: /\.s(a|c)ss$/,
          include,
          exclude: exclude ? [/\.module\./].concat(exclude) : /\.module\./,
          use: loaders().concat({
            loader: "sass-loader",
            options: { sourceMap: true }
          })
        },
        // regular stylus
        {
          test: /\.styl$/,
          include,
          exclude: exclude ? [/\.module\./].concat(exclude) : /\.module\./,
          use: loaders().concat({
            loader: "stylus-loader",
            options: { sourceMap: true }
          })
        },
        // css-modules css
        {
          test: /\.module\.css$/,
          include,
          exclude,
          use: loaders({ "css-loader": { modules: true } })
        },
        // css-modules sass
        {
          test: /\.module\.s(a|c)ss$/,
          include,
          exclude,
          use: loaders({ "css-loader": { modules: true } }).concat({
            loader: "sass-loader",
            options: { sourceMap: true }
          })
        },
        // css-modules stylus
        {
          test: /\.module\.styl$/,
          include,
          exclude,
          use: loaders({ "css-loader": { modules: true } }).concat({
            loader: "stylus-loader",
            options: { sourceMap: true }
          })
        }
      ]
    }
  };
};
