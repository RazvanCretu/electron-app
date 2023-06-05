const pjson = require("./package.json");

module.exports = {
  //  Electron Builder Settings
  appId: `com.electron.${pjson.name}`,
  // eslint-disable-next-line no-template-curly-in-string
  artifactName: "${productName} setup.${ext}",
  // The below is need so that `electron-builder` won't search
  // for public/electron.js but rather in the paths
  // included in `files` property. electron/electron.js our case.
  extends: null,
  files: ["build/**/*", "electron/**/*", "package.json"],
  // eslint-disable-next-line no-template-curly-in-string
  directories: { output: "./dist/${version}" },
  publish: {
    provider: "github",
    owner: "RazvanCretu",
    repo: "electron-app",
    // eslint-disable-next-line no-template-curly-in-string
    token: "${env.GH_TOKEN}",
  },
};
