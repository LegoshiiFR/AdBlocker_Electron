const { app, BrowserWindow, session } = require('electron');
const adblock = require('ad-block');

let mainWindow;

app.on('ready', () => {
  adblocker.enable();

  mainWindow = new BrowserWindow({ 
    width: 800, 
    height: 600,
});

  // Intercepter les requêtes pour bloquer les publicités
  mainWindow.webContents.session.webRequest.onBeforeRequest((details, callback) => {
    if (adblock.isAd(details.url)) {
      // Bloquer la requête
      callback({ cancel: true });
    } else {
      // Autoriser la requête
      callback({});
    }
  });

  mainWindow.loadFile('src/index.html');
});
