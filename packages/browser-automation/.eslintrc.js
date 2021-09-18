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
    "plugin:@typescript-eslint/recommended"
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: [
    ".eslintrc.js"
  ],
  rules: {
    quotes: ["warn", "double", { "allowTemplateLiterals": true }],
    "@typescript-eslint/explicit-module-boundary-types": 0
  }
};