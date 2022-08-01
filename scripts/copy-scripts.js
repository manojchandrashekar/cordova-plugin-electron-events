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

  const electronSettingsFile = path.resolve(
    wwwDir,
    "cdv-electron-settings.json"
  );
  const electronSettings = require(electronSettingsFile);
  electronSettings.electronEvents.forEach((ev) => {
    fs.copyFileSync(
      path.resolve(projectRoot, ev.script),
      path.resolve(wwwDir, path.basename(ev.script))
    );
    fs.copyFileSync(
      path.resolve(projectRoot, ev.script),
      path.resolve(platformWww, path.basename(ev.script))
    );
  });
};
