module.exports = {
  extends: [
    'plugin:react-hooks/recommended',
    '@rocketseat/eslint-config/react',
  ],
  plugins: ['react', 'simple-import-sort'],
  rules: {
    camelcase: 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    // increase the severity of rules so they are auto-fixable
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Packages `react` related packages come first.
          ['^react', '^@?\\w'],
          // Internal packages.
          ['^(@|components)(/.*|$)'],
          // Side effect imports.
          ['^\\u0000'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.?(css)$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
  },
}
