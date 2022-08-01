module.exports = function (context) {
  const path = require("path");
  const fs = require("fs");
  const cordova_util = context.requireCordovaModule(
    "cordova-lib/src/cordova/util"
  );
  const platforms = context.requireCordovaModule(
    "cordova-lib/src/platforms/platforms"
  );

  const projectRoot = cordova_util.cdProjectRoot();
  const platform = "electron";
  const platformPath = path.join(projectRoot, "platforms", platform);
  const platformApi = platforms.getPlatformApi(platform, platformPath);
  const platformInfo = platformApi.getPlatformInfo();
  const wwwDir = platformInfo.locations.www;
  const platformWww = platformInfo.locations.platformWww;
  const checkString = "// <cordova-plugin-electron-events>";
  const cdvElectronMain = path.resolve(platformWww, "cdv-electron-main.js");
  const cdvElectronMainWww = path.resolve(wwwDir, "cdv-electron-main.js");
  const cdvElectronPart = path.resolve(
    context.opts.plugin.dir,
    "scripts/cdv-electron-main.part.js"
  );

  try {
    // Check if file exists -- www
    if (fs.existsSync(cdvElectronMainWww)) {
      // Check if file is already processed
      const cdvElectronMainData = fs.readFileSync(cdvElectronMainWww, "utf-8");
      if (cdvElectronMainData.indexOf(checkString) < 0) {
        // Proceed only if not processed
        const cdvElectronPartData = fs.readFileSync(cdvElectronPart, "utf-8");
        fs.appendFileSync(cdvElectronMainWww, cdvElectronPartData, "utf-8");
      }
    }

    // Check if file exists -- platform_www
    if (fs.existsSync(cdvElectronMain)) {
      // Check if file is already processed
      const cdvElectronMainData = fs.readFileSync(cdvElectronMain, "utf-8");
      if (cdvElectronMainData.indexOf(checkString) < 0) {
        // Proceed only if not processed
        const cdvElectronPartData = fs.readFileSync(cdvElectronPart, "utf-8");
        fs.appendFileSync(cdvElectronMain, cdvElectronPartData, "utf-8");
      }
    }
  } catch (e) {
    console.error(e);
  }
};
