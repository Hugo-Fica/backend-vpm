module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['standard', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'object-shorthand': 'off',
    camelcase: 'off',
    'lines-between-class-members': 'off',
    'no-prototype-builtins': 'off',
  },
};
