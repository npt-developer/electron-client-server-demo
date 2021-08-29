import { app, BrowserWindow, screen, ipcMain, Menu, Tray } from 'electron';
import * as path from 'path';
import * as url from 'url';
import ENV_CONFIG from './env.config';

let win: BrowserWindow = null;
let isAppClose: boolean = false;
// 
let isForceQuit: boolean = false;

function createWindow(): BrowserWindow {

  const tray: Tray = new Tray(path.join(__dirname, 'favicon.ico'));

  tray.setContextMenu(Menu.buildFromTemplate([
    {
      label: 'Show App', click: function () {
        win.show();
      }
    },
    {
      label: 'Quit', click: function () {
        isForceQuit = true;
        app.quit();
      }
    }
  ]));

  tray.on('click', function(e) {
    win.show();
  });

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    // show: false,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: !ENV_CONFIG.isProduction,
      contextIsolation: false,  // false if you want to run 2e2 test with Spectron
      enableRemoteModule : true // true if you want to run 2e2 test  with Spectron or use remote module in renderer context (ie. Angular)
    },
  });

  if (!ENV_CONFIG.isProduction) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/../node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    const indexUrl: string = `file://${path.join(__dirname, 'app', 'index.html')}`
    // url.format string @deprecated — since v11.0.0 - Use the WHATWG URL API.
    // const indexUrl: string = url.format({
    //   pathname: path.join(__dirname, 'app', 'index.html'),
    //   protocol: 'file:',
    //   slashes: true
    // });
    win.loadURL(indexUrl);
  }

  if (ENV_CONFIG.isShowDeveloperTool) {
    // open dev tools
    win.webContents.openDevTools();
  }

  win.on('minimize',function(event){
    event.preventDefault();
    win.hide();
  });

  win.on('close', function(e: Event){
    if(!isForceQuit){
      e.preventDefault();
      win.hide();
    } else {
      // Emitted when the window is closed.
      // https://stackoverflow.com/a/58367453
      // Dereference the window object, usually you would store window
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      if (!isAppClose) {
        if (win) {
          e.preventDefault();
          win.webContents.send('app:close');
        }
      }
    }
    return false;
  });

  // You can use 'before-quit' instead of (or with) the close event
  app.on('before-quit', function (e) {
    // Handle menu-item or keyboard shortcut quit here
    if(!isForceQuit){
      e.preventDefault();
      win.hide();
    }
  });

  win.on('closed', function(){
    console.log("closed");
    win = null;
    app.quit();
  });

  return win;
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // comment by using send event close before electron close
  // Quit when all windows are closed.
  // app.on('window-all-closed', () => {
  //   // On OS X it is common for applications and their menu bar
  //   // to stay active until the user quits explicitly with Cmd + Q
  //   if (process.platform !== 'darwin') {
  //     app.quit();
  //   }
  // });

  // https://stackoverflow.com/a/58367453
  ipcMain.on('app:closed', () => {
    isAppClose = true;
    win = null;
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });
} catch (e) {
  // Catch Error
  throw e;
}