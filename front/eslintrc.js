module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    commonjs: true,
    jest: true
  },
  plugins: ['react', 'import', '@javascript-eslint'],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  parser: '@javascript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'no-console': 'warn',
    'no-eval': 'error',
    'import/first': 'error'
  }
};
