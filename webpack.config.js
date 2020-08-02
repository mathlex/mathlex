const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const paths = {
    build: path.resolve(__dirname, 'build'),
    demo: path.resolve(__dirname, 'demo'),
    src: path.resolve(__dirname, 'src'),
};

module.exports = [
    {
        name: 'mathlex',
        entry: path.resolve(paths.src, 'index.coffee'),
        output: {
            filename: 'mathlex.js',
            path: paths.build,
            library: {
                amd: 'mathlex',
                commonjs: 'mathlex',
                root: 'MathLex',
            },
            libraryTarget: 'umd',
        },
        mode: 'production',
        devtool: 'source-map',
        resolve: {
            extensions: ['.coffee', '.js', '.yy'],
        },
        module: {
            rules: [
                {
                    test: /\.coffee$/,
                    use: 'coffee-loader',
                },
                {
                    test: /\.yy$/,
                    use: 'jison-loader',
                },
            ],
        },
        node: {
            fs: 'empty',
        },
    },
    {
        name: 'demo',
        entry: path.resolve(paths.demo, 'index.coffee'),
        output: {
            filename: 'index.js',
            path: path.resolve(paths.build, 'demo'),
            library: 'demo',
            libraryTarget: 'umd',
        },
        mode: 'production',
        devtool: 'source-map',
        resolve: {
            extensions: ['.coffee', '.js'],
        },
        module: {
            rules: [
                {
                    test: /\.pug$/,
                    use: 'pug-loader',
                },
                {
                    test: /\.coffee$/,
                    use: 'coffee-loader',
                },
                {
                    test: /\.s[ac]ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(png)$/,
                    use: 'file-loader',
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(paths.demo, 'index.pug'),
                palettes: require('./demo/palettes'),
            }),
        ],
        externals: {
            jquery: {
                root: 'jQuery',
                amd: 'jquery',
                commonjs: 'jquery',
                commonjs2: 'jquery',
            },
            mathlex: {
                root: 'MathLex',
                amd: 'mathlex',
                commonjs: 'mathlex',
                commonjs2: 'mathlex',
            },
        },
    },
];
