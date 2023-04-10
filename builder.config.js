module.exports = {
  //  Electron Builder Settings
  appId: "com.${name}",
  artifactName: "${productName} setup.${ext}",
  extends: null,
  files: ["build/**/*", "electron/**/*", "package.json"],
  directories: { output: "./dist/${version}" },
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
