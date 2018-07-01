module.exports = {
  "extends": [
    "react-app",
    "plugin:jsx-a11y/recommended"
  ],
  "plugins": [
    "jsx-a11y"
  ],
  "rules": {
    "indent": [
      "warn",
      2,
      {
        "SwitchCase": 1,
        "flatTernaryExpressions": true
      }
    ],
    "react/jsx-indent": [
      "warn",
      2
    ],
    "react/jsx-indent-props": [
      "warn",
      2
    ],
    "semi": [
      "error",
      "never"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "no-unused-vars": [
      "warn",
      {
        "vars": "all",
        "args": "none",
        "caughtErrors": "none"
      }
    ]
  }
}