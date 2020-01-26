/* eslint-env node */

module.exports = {
  hooks: {
    "pre-commit": "lint-staged",
    "pre-push": "npm run lint"
  }
};
