/* eslint-disable no-undef */

module.exports = {
  extends: [
    'eslint-config-prettier',
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  plugins: ["import", "@typescript-eslint", "unused-imports", "no-only-tests"],
  env: {
    browser: true,
    node: false,
    mocha: true,
    es2021: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
    },
    ecmaVersion: "latest",
    sourceType: "module",
    lib: ["ES2021"]
  },

  rules: {
    "@typescript-eslint/explicit-function-return-type": "error",
    "import/no-unresolved": ["error"],
    "unused-imports/no-unused-imports": "error",
    "no-only-tests/no-only-tests": "error",
    "no-dupe-class-members": "off",
    'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
    'no-underscore-dangle': 'off',
    "import/extensions": ["error", "never", "ignorePackages", {
      "js": "never",
      "ts": "never"
    }],
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
    // 'class-methods-use-this': 'off',
    // 'no-plusplus': 'off',
  },

  overrides: [
    {
      files: [
        "test/**/*.ts",
        "demo/**/*.ts",
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
    {
      "files": [
        "**/*.ts"
      ],
      "rules": {
        "no-redeclare": "off"
      }
    }
  ],

  settings: {
    'import/parsers': {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    'import/extensions': [".js", ".jsx", ".ts", ".tsx"],
    'import/resolver': {
      "typescript": {
      },
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  }
};
