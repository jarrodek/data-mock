/* eslint-disable no-undef */

module.exports = {
  extends: [
    'eslint:recommended',
    require.resolve('eslint-config-airbnb-base'),
    require.resolve('eslint-config-prettier'),
  ],
  env: {
    browser: true,
    node: false,
    mocha: true,
    es2020: true
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    sourceType: "module",
    ecmaVersion: 2020
  },

  // presets: [
  //   [
  //     "@babel/preset-env",
  //     {
  //       shippedProposals: true
  //     }
  //   ]
  // ],

  plugins: ['no-only-tests'],

  rules: {
    'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
    'no-underscore-dangle': 'off',
    // air bnb restricts for of loops, which we want to allow. we can't cherry pick it out, so we have to copy over the existing rules
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    'no-only-tests/no-only-tests': 'error',
    'import/extensions': ['error', 'always', { ignorePackages: true }],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/test/**/*.{html,js,mjs,ts}',
          '**/*.config.{html,js,mjs,ts}',
          '**/*.conf.{html,js,mjs,ts}',
        ],
      },
    ],
    'class-methods-use-this': 'off',
    'no-plusplus': 'off',
  },

  overrides: [
    {
      files: [
        "test/**/*.js",
        "demo/**/*.js",
        "**/demo/**/*.html"
      ],
      rules: {
        "no-console": "off",
        "no-unused-expressions": "off",
        "no-plusplus": "off",
        "no-param-reassing": "off",
        "class-methods-use-this": "off",
        "import/no-extraneous-dependencies": "off"
      }
    },
  ],
};
