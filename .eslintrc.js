module.exports = {
  "extends": ["react-app", "plugin:jsx-a11y/recommended"],
  "plugins": ["jsx-a11y"],
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
    "semi": ["error", "never"],
    "no-unused-vars": [
      "error",
      {
        "vars": "all",
        "args": "none",
        "caughtErrors": "none"
      }
    ]
  }
};