module.exports = {
  'settings': {
    'react': {
      'version': 'detect',
    },
  },
  'extends': [
    'jorrodev/typescript',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  'rules': {
    '@typescript-eslint/no-unused-vars': 'error',
  },
};
