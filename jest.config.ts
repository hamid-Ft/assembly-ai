export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: { module: "es2020" },
        BabelConfig: {
          configFile: false,
          presets: [
            ["@babel/preset-env", { targets: { node: "current" } }],
            "@babel/preset-typescript",
          ],
        },
      },
    ],
  },
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__mocks__/fileMock.js",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },
};
