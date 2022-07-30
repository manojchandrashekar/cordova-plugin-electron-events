# cordova-plugin-electron-events

A cordova plugin for the electron platform to hook into electron lifecycle events.

Supports listening to events emitted by `app` object without having to edit electron platform files.

## Features

Supported events: https://www.electronjs.org/docs/latest/api/app#events (Check according to the version of electronjs used in your project)

Requires `cordova-electron >= 2.0.0`.

## Installation

```
$ npm install cordova-plugin-electron-events
```

## Usage

Create a `settings.json` file in the project for electron (as described [here](https://cordova.apache.org/docs/en/11.x/guide/platforms/electron/index.html#customizing-the-application's-window-options)) with additional parameter `electronEvents`:

```javascript
"electronEvents": [
  {
    "event": "<event-name>",
    "script": "<src/to/script.js>" // Relative to project root
  }
]
```

Example:

```javascript
{
  "browserWindow": {
    "width": 1280,
    "height": 800
  },
  "electronEvents": [
    {
      "event": "web-contents-created",
      "script": "scripts/web-contents-created.js"
    }
  ]
}
```

Each script should contain a default exported javascript function that matches the signature of the respective electron event handler.

For instance, to modify the user agent of the `BrowserWindow` instance, the script may look like:

```javascript
module.exports = function (event, webContents) {
  // Set custom user agent.
  webContents.setUserAgent("Custom User Agent v1.4.7");
};
```

## Issues

Create a [GitHub issue](https://github.com/manojchandrashekar/cordova-plugin-electron-events/issues/new).
