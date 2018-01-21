// Don't use 'git add' as a step because it doesn't work for partially staged files.
// Run `npm run fix` and then add the relevant files to your commit again.
module.exports = {
  "*.{js,jsx}": ["prettier --list-different", "eslint --ext .js,.jsx"],
  "*.{ts,tsx,vue,json,css,scss,less,md}": ["prettier --list-different"],
};
