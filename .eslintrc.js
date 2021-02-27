module.exports = {
    env: {
        browser: true,
    },
    extends: ["eslint:recommended"],
    ignorePatterns: ["node_modules/"],
    parser: 'babel-eslint',
    globals: {
        chrome: true,
    },
};