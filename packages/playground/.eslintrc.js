module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  extends: [
    '../../.eslintrc.js',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
  ],

  rules: {
    'no-restricted-imports': 'off',
    'vue/require-default-prop': 'off',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
  globals: {
    wx: true,
    WWOpenData: true,
  },
}
