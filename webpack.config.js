const path = require('path');
const publicPath = path.resolve(__dirname, 'dist');

const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const eslintOptions = {
    fix: true,
};
const base = {
    mode: 'production',
};

const background = {
    ...base,
    name: 'background',
    entry: './src/background/index.js',
    output: {
        filename: 'background.js',
        path: publicPath,
    },
    plugins: [
        new ESLintPlugin(eslintOptions),
    ],
};

const content = {
    ...base,
    name: 'content',
    entry: ['./src/content/js/index.js', './src/content/scss/content.scss'],
    output: {
        filename: 'content.js',
        path: publicPath,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [['@babel/plugin-proposal-class-properties']]
                    }
                }
            }, {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath },
                    },
                    'css-loader',
                    'sass-loader',
                ],
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'content.css' }),
        new ESLintPlugin(eslintOptions),
    ],
};

const popup = {
    ...base,
    name: 'popup',
    entry: ['./src/popup/js/popup.js', './src/popup/scss/popup.scss'],
    output: {
        filename: 'popup.js',
        path: publicPath,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath },
                    },
                    'css-loader',
                    'sass-loader',
                ],
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'popup.css' }),
        new ESLintPlugin(eslintOptions),
    ],
};

module.exports = [
    background,
    content,
    popup,
];