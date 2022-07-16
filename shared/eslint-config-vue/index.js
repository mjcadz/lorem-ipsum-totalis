module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: ['plugin:vue/vue3-recommended', 'eslint:recommended', '@vue/typescript/recommended', '@vue/prettier'],
  parserOptions: {
    ecmaVersion: 2021,
  },
  plugins: [],
  rules: {},
  ignorePatterns: ['node_modules', 'public', 'coverage', 'dist', 'dist_types', '.turbo'],
  rules: {},
}
