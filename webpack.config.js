const path = require('path');
const publicPath = path.resolve(__dirname, 'dist');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const jsRules = {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'eslint-loader',
    options: {
        fix: true,
    },
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
    module: {
        rules: [jsRules],
    },
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
            jsRules,
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
        new MiniCssExtractPlugin({ filename: 'content.css' })
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
            jsRules,
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
        new MiniCssExtractPlugin({ filename: 'popup.css' })
    ],
};

module.exports = [
    background,
    content,
    popup,
];