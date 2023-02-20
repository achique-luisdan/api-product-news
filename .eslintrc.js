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
    'node': true,
    'mocha': true
  },
  'rules': {
    'no-console': 'warn',
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'max-len': ['warn', { 'code': 80, 'ignoreTemplateLiterals': true }],
    'no-template-curly-in-string': 'error',
    'no-unused-vars': 'warn'
  }
};
