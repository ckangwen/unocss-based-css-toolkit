module.exports = {
  extends: ['@antfu'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        paths: ['unocss'],
      },
    ],
    'yml/no-empty-document': 'off',
  },
}
