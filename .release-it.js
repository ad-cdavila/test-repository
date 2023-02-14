module.exports = {
  git: {
    tag: false,
    commitMessage: "chore(release): v${version}"
  },
  plugins: {
    "@release-it/bumper": {
      in: {
        "file": "app.json",
        "path": "expo.version"
      },
      out: {
        "file": "app.json",
        "path": "expo.version"
      }
    },
    "@release-it/conventional-changelog": {
      infile: "CHANGELOG.md",
      "preset": {
        "name": "conventionalcommits",
        "types": [
          {
            "type": "feat",
            "section": ":rocket: Features"
          },
          {
            "type": "fix",
            "section": ":bug: Bug Fixes"
          }
        ]
      }
    }
  }
}