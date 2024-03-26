import { app, BrowserWindow, Menu, Tray } from 'electron';
import path from 'path';
import { registerTitlebarIpc } from '@main/mainwindow/titlebarIpc';
import { registerPopUpIpc } from './mainwindow/popUpIpc';

// Electron Forge automatically creates these entry points
declare const APP_WINDOW_WEBPACK_ENTRY: string;
declare const APP_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

let appWindow: BrowserWindow;
let tray = null;
let isQuitting = false;
let windowContext = { forceClose: false };



/**
 * Create Application Window
 * @returns {BrowserWindow} Application Window Instance
 */
export function createAppWindow(): BrowserWindow {

  // Create new window instance
  appWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#202020',
    show: false,
    autoHideMenuBar: true,
    frame: false,
    titleBarStyle: 'hidden',
    icon: path.resolve('assets/images/appIcon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      preload: APP_WINDOW_PRELOAD_WEBPACK_ENTRY,
      sandbox: false,
    },
  });

  // Load the index.html of the app window.
  appWindow.loadURL(APP_WINDOW_WEBPACK_ENTRY);

  //appWindow.webContents.openDevTools();


  // Show window when its ready to
  appWindow.on('ready-to-show', () => appWindow.show());

  // Register Inter Process Communication for main process
  registerMainIPC();

  initTray();

  return appWindow;
}


function initTray() {
  tray = new Tray(path.resolve('assets/images/appIcon.ico')); // Path to your tray icon
  const trayMenu = Menu.buildFromTemplate([
    {
      label: 'Show App', click: function () {
        appWindow.show();
      }
    },
    {
      label: 'Quit', click: function () {
        isQuitting = true;
        app.quit();
      }
    }
  ]);

  tray.setToolTip('IM-Info');
  tray.setContextMenu(trayMenu);
  tray.on('double-click', () => {
    if (appWindow.isVisible()) {
      appWindow.hide();
    } else {
      appWindow.show();
    }
  });

  // Hide the window when it is closed
  appWindow.on('close', function (event) {
    if (windowContext.forceClose) {
      return true;
    }
    if (!isQuitting) {
      event.preventDefault();
      appWindow.hide();
    }
    return false;
  });
}


/**
 * Register Inter Process Communication
 */
function registerMainIPC() {
  /**
   * Here you can assign IPC related codes for the application window
   * to Communicate asynchronously from the main process to renderer processes.
   */
  registerTitlebarIpc(appWindow, windowContext);
  registerPopUpIpc(appWindow);
}
