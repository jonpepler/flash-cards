module.exports = {
  extends: ['@commitlint/config-conventional'],
  ignores: [(commit) => commit.includes('WIP')]
}
