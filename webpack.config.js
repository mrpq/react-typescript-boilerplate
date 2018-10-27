// tslint:disable
const merge = require('webpack-merge');
const path = require('path');

const parts = require('./webpack.parts.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

const PATHS = {
    root: path.resolve(__dirname),
    app: path.resolve(path.join(__dirname, 'src')),
};

const commonConfig = merge([
    {
        entry: path.join(PATHS.app, 'index.js'),
        output: {
            filename: 'index.js',
            path: path.join(PATHS.root, './dist'),
        },
    },
    {
        plugins: [
            new HtmlWebpackPlugin({
                // Required
                inject: false,
                template: require('html-webpack-template'),
                // Optional - https://github.com/jaketrent/html-webpack-template
                // много дополнительных полей для темплейта генерируемого index.html
                appMountId: 'root',
            }),
            new ErrorOverlayPlugin(),
        ],
    },
    {
        resolve: {
            extensions: ['*', '.js', '.json', '.jsx'],
        },
    },
]);

const productionConfig = merge([
    parts.loadJS({ exclude: [/node_modules/] }),
    parts.loadCSS(),
    parts.generateSourceMaps({ type: 'source-map' }),
    parts.loadImg({
        options: { limit: 15, name: './static/img/[name].[hash:4].[ext]' },
    }),
]);

const developmentConfig = merge([
    parts.loadJS(),
    parts.devServer({ host: process.env.HOST, port: process.env.PORT }),
    parts.loadCSS(),
    parts.generateSourceMaps({ type: 'inline-source-map' }),
    parts.loadImg(),
]);

module.exports = (env, argv) => {
    process.env.BABEL_ENV = env;

    if (env === 'production') {
        return merge([commonConfig, productionConfig, { mode: env }]);
    }

    if (env === 'development') {
        return merge([commonConfig, developmentConfig, { mode: env }]);
    }
};
