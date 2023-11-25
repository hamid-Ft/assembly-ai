module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'airbnb-typescript',
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    settings: { react: { version: 'detect' } },
    plugins: ['prettier', '@typescript-eslint', 'react-refresh'],
    rules: {
        'linebreak-style': ['error', 'windows'],
        'react/no-danger': 'off', // it's self explainatory that no-danger should be used sparingly
        'react/react-in-jsx-scope': 'off', // next.js does not require react in most components
        'react/prop-types': 'off', // as long as TS strict mode is off this is not required
        'prettier/prettier': 'error',
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
    },
    overrides: [
        {
            files: ['vite.config.ts'],
            rules: {
                'import/no-extraneous-dependencies': 'off',
            },
        },
    ],
};
