import algolia from 'eslint-config-algolia/flat/base.js';

export default [
  ...algolia,
  {
    ignores: ['node_modules/**'],
  },
  {
    files: ['eslint.config.js'],
    rules: {
      'import/extensions': 'off',
    },
  },
  {
    files: ['vite.config.js'],
    rules: {
      'import/no-unresolved': 'off',
    },
  },
];
