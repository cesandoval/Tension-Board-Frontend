module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    'nuxt/no-cjs-in-config': 'off',

    'prettier/prettier': [
      'warn',
      {
        trailingComma: 'es5',
        singleQuote: true,
        semi: false,
        arrowParens: 'avoid',
      },
    ],

    'vue/html-indent': ['warn', 2],
    'vue/html-self-closing': 'off',

    'vue/no-use-v-if-with-v-for': 'off',
    'vue/no-unused-components': 'off',

    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 5,
        multiline: {
          max: 3,
          allowFirstLine: true,
        },
      },
    ],
  },
}
