// <cordova-plugin-electron-events>

// !!! NOTE: DO NOT MODIFY !!!

const projectRoot = path.resolve(__dirname, "../../../");
let events = [];

if (
  cdvElectronSettings.electronEvents &&
  Array.isArray(cdvElectronSettings.electronEvents)
) {
  events = cdvElectronSettings.electronEvents;
}

events.forEach((ev) => {
  let scriptFile = path.resolve(__dirname, path.basename(ev.script));
  let evFn = require(scriptFile);
  app.on(ev.event, evFn);
});

// </cordova-plugin-electron-events>
