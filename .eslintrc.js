module.exports = {
  env: {
    browser: true,
    amd: true,
    node: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
    "next",
    "next/core-web-vitals",
  ],
  rules: {
    semi: ["error", "never"],
    "jsx-a11y/anchor-is-valid": ["error", {
      "components": ["Link"], 
      "specialLink": ["hrefLeft", "hrefRight"], 
      "aspects": ["invalidHref", "preferButton"]
    }]
  },
  "overrides": [
    {
      "files": [
        "**/*.spec.js",
        "**/*.spec.jsx"
      ],
      "env": {
        "jest": true
      }
    }
  ]
};