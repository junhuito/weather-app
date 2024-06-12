// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: ['expo', 'plugin:@typescript-eslint/recommended'],
  rules: {
    'react-hooks/exhaustive-deps': 'error',
  },
};
