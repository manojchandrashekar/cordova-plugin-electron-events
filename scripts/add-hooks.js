module.exports = function (ctx) {
  const path = require("path");
  const fs = require("fs");

  const checkString = "// <cordova-plugin-electron-events>";

  const cdvElectronMain = path.resolve(
    ctx.opts.projectRoot,
    "platforms/electron/platform_www/cdv-electron-main.js"
  );
  const cdvElectronPart = path.resolve(
    ctx.opts.plugin.dir,
    "scripts/cdv-electron-main.part.js"
  );

  try {
    // Check if file exists
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

  // console.log("Processing electron hooks...", ctx);
};
