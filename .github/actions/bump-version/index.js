const core = require('@actions/core');
const semver = require('semver');
const gitLatestSemverTag = require('git-latest-semver-tag');

const { exec, execSync } = require("child_process");

const SUPPORTED_RELEASES = ['major', 'minor', 'patch'];

const getLatestTag = () => new Promise((resolve, reject) => {
  gitLatestSemverTag((err, tag) => {
    if (err) reject(err);

    resolve(tag);
  });
});

(async () => {
  try {
    execSync('git fetch --tags');

    let latestTag = await getLatestTag();

    if (!latestTag) {
      latestTag = '0.0.0';
    } else {
      latestTag = semver.valid(latestTag);
    }

    const increment = core.getInput('increment');

    if (!SUPPORTED_RELEASES.includes(increment)) {
      throw new Error(`Increment ${increment} not supported`);
    }

    const bumpVersion = semver.inc(latestTag, increment);
    core.setOutput('bump-version', bumpVersion);

    console.log(`Current version: ${latestTag}`);
    console.log(`Bump version: ${bumpVersion}`);
  } catch (error) {
    core.setFailed(error);
  }
})()