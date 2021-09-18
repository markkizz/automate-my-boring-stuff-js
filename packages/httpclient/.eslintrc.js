/* eslint-disable */
/**
 * @typedef { import('eslint').Linter.Config } Options
 */

/**
 * @type { Options }
 */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    quotes: ["warn", "double"],
    "@typescript-eslint/explicit-module-boundary-types": 0
  }
};