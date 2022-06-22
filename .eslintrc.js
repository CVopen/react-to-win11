module.exports = {
  extends: ['alloy', 'alloy/react', 'alloy/typescript'],
  env: {
    // 你的环境变量（包含多个预定义的全局变量）
    //
    browser: true,
    // node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // 你的全局变量（设置为 false 表示它不允许被重新赋值）
    //
    // myGlobal: false
  },
  rules: {
    quotes: [1, 'single'],
    semi: [2, 'never'],
    '@typescript-eslint/explicit-member-accessibility': 'off',
    'prefer-promise-reject-errors': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'no-param-reassign': 'off',
    '@typescript-eslint/no-invalid-void-type': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    'react/jsx-no-constructed-context-values': 'off',
  },
}
