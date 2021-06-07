module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended'
    ],
    parserOptions: {
        ecmaVersion: 12
    },
    rules: {
        'no-empty': 'off',
        'prefer-const': 'warn',
        'arrow-parens': 'warn',
        'no-unused-vars': 'warn',
        quotes: ['warn', 'single'],
        'no-empty-function': 'warn',
        'eol-last': ['warn', 'never'],
        'comma-dangle': ['warn', 'never'],
        'quote-props': ['warn', 'as-needed'],
        semi: ['warn', 'always', { omitLastInOneLineBlock: true }]
    },
    ignorePatterns: [
        'node_module'
    ]
};