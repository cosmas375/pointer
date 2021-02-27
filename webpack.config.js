const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        content: './src/content/js/index.js',
        background: './src/background/index.js',
        // popup: './src/popup/index.js',
    },
    output: {
        filename: '[name].js',
        path: __dirname,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    fix: true,
                },
            },
        ],
    },
};