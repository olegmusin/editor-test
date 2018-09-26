module.exports = {
  "plugins": [
    "css-modules"
  ],
  "env": {
    "browser": true, // allows browser variables, e.g. "document.xxx"
    "jest": true // fixes no-def and other jest env errors in test files
  },
  "globals": { // used by jest setup files (e.g. setup.js)
    "shallow": true,
    "render": true,
    "mount": true,
    "assertMethod": true,
    "assertMethodNotCalled": true,
    "mockStore": true,
    "newMockAdapter": true,
    "getMockTokenData": true,
    "getMockJwt": true
  },
  "extends": [
    "airbnb",
    "plugin:css-modules/recommended"
  ],
  "rules": {
    "object-curly-newline": ["error", { "consistent": true }],
    "max-len": ["error", {
      "code": 100,
      ignoreUrls: true,
      ignoreRegExpLiterals: true,
    }],
    "import/order": ["error", {
      "newlines-between": "always",
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index']
    }],
    "import/no-unresolved": ["error", { ignore: [/\?(raw|raw-module)$/] }],
    "lines-between-class-members": ["error", "always"],
    "no-warning-comments": "warn",
    "css-modules/no-unused-class": "warn",
    "valid-jsdoc": ["error", {
      "prefer": { "return": "returns" },
      requireReturn: false, // Note: only requires if method returns something.
    }],
    "lines-around-comment": [ "error", {
      "beforeLineComment": true,
      "allowBlockStart": true,
      "allowObjectStart": true
    }],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "const", next: "export" },
      { blankLine: "always", prev: "*", next: [
        "block",
        "block-like",
        "function",
        "multiline-block-like",
        "multiline-expression"
      ]},
      { blankLine: "always", prev: [
        "block",
        "block-like",
        "function",
        "multiline-block-like",
        "multiline-expression"
      ], next: "*" }
    ],
    "no-console": "warn",
    "react/prefer-stateless-function": "warn"
  }
};