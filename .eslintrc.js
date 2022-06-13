module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 2020
  },
  rules: {
    'no-console': 'off',
    'no-param-reassign': 'off',
    'import/prefer-default-export': 'off'
  }
}
