const pjson = require("./package.json");

module.exports = {
  //  Electron Builder Settings
  appId: `com.electron.${pjson.name}`,
  artifactName: "${productName} setup.${ext}",
  // The below is need so that `electron-builder` won't search for public/electron.js but rather in the paths included in `files`
  // electron/electron.js our case.
  extends: null,
  files: ["build/**/*", "electron/**/*", "package.json"],
  directories: { output: "./dist/${version}" },
  publish: {
    provider: "github",
    owner: "RazvanCretu",
    repo: "electron-app",
    token: "${env.GH_TOKEN}",
  },
};

// appId: com.example.electron-cra
// asar: false
// directories:
//   buildResources: assets
// extends: null
// files:
//   - build/**/*
//   - electron/**/*
//   - package.json
// publish:
//   provider: github
//   private: true
//   owner: RazvanCretu
// mac:
//   publish:
//     provider: github
//     owner: RazvanCretu
//     repo: electron-app
// win:
//   publish:
//     provider: github
//     owner: RazvanCretu
//     repo: electron-app
