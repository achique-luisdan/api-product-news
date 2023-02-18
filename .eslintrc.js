module.exports ={
  'parserOptions': {
    'ecmaVersion': 2018
  },
  'extends': [
    'eslint:recommended',
    'prettier'
  ],
  'env': {
    'es6': true,
    'node': true
  },
  'rules': {
    'no-console': 'warn',
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always']
  }
};
