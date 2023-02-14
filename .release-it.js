module.exports = {
  git: false,
  npm: false,
  hooks: {
    "after:release": "echo 'version=v${version}' >> $GITHUB_OUTPUT"
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
          },
          {
            type: "BREAKING CHANGE",
            section: "🚨 Breaking Changes"
          }
        ]
      }
    }
  }
}