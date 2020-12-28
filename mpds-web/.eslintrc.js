// .eslintrc.js
const rules = {
  // TODO: remove the following rules to error
  // 'no-console':'error',
  'react/prop-types': 'off',
  'prefer-destructuring': 'off',
  'jsx-a11y/anchor-is-valid': 'off',
  'react/no-this-in-sfc': 'off', // this one probably will have to stay
  'consistent-return': 'off', // this one probably will have to stay (if the function ends in try catch this rule return error even if it is not)
  // Rules to stay
  '@typescript-eslint/interface-name-prefix': ['error', { 'prefixWithI': 'always' }],
  'prettier/prettier': 'warn'
};

module.exports = {
    env: {
      browser: true,
      es6: true,
      node: true
    },
    extends: [
      'plugin:f3m-static-analysis/reactRecommended',
      'plugin:prettier/recommended',
      // "prettier",
      'prettier/react'
    ],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly'
    },
    // "parser": "@typescript-eslint/parser",
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      },
      ecmaVersion: 2018,
      sourceType: 'module',
      project: 'tsconfig.json'
    },
    plugins: ['f3m-static-analysis', 'prettier'],

    overrides: [
      // overrides configuration for typescript files
      {
        files: ['*.ts', '*.tsx'],
        excludedFiles: ['*.d.ts'],
        parser: '@typescript-eslint/parser',
        extends: [
          'plugin:@typescript-eslint/recommended',
          'plugin:f3m-static-analysis/reactRecommended',
          'prettier',
          'prettier/react',
          'prettier/@typescript-eslint'
        ],
        plugins: ['@typescript-eslint', 'f3m-static-analysis', 'prettier'],
        rules
      }
    ],
    //Ignoretestfiles
    ignorePatterns: ['*.test.*', 'eslint-plugin-f3m-static-analysis/', '*.d.ts'],
    // globalsettingsforallplugins
    settings: {
      // < START > eslint-plugin-import
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', 'ts', 'tsx']
        }
      },
      // </ END > eslint-plugin-import
      // < START > eslint-plugin-react
      react: {
        createClass: 'createReactClass', // Regex for Component Factory to use,
        // default to "createReactClass"
        pragma: 'React', // Pragma to use, default to "React"
        version: 'detect' // React version. "detect" automatically picks the version you have installed.
        // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
        // default to latest and warns if missing
        // It will default to "detect" in the future
        // "flowVersion": "0.53" // Flow version
      }
    },
    // </ END > eslint-plugin-react
    rules
  };
