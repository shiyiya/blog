module.exports = {
  extends: 'airbnb-base',
  env: {
    es6: true,
    node: true,
  },
  rules: {
    'linebreak-style': [0, 'error', 'windows'],
    'no-debugger': 'off',
    'no-console': 'off',
    'no-restricted-syntax': 0,
    camelcase: ['error', { allow: ['aa_bb'] }],
  },
};
