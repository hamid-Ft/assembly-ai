export default {
    preset: 'ts-jest', // Presetting to typescript jest
    testEnvironment: 'jsdom', // Testing environment is jsdom
    setupFiles: ['./jest.setup.ts'],
    transform: {
        '^.+\\.tsx?$': [
            // If the file is a typescript or typescript jsx file transform it using ts-jest
            'ts-jest',

            {
                tsconfig: { module: 'es2020' }, // Using ECMAScript 2020 module specification

                BabelConfig: {
                    configFile: false, // No configuration file for Babel

                    // Presetting to @babel/preset-env with targets and @babel/preset-typescript
                    presets: [
                        ['@babel/preset-env', { targets: { node: 'current' } }],
                        '@babel/preset-typescript',
                    ],
                },
            },
        ],
    },

    // For certain file types, mock file or identity object proxy is used
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    },
};
