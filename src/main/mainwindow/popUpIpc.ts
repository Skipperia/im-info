import { BrowserWindow, ipcMain, shell } from 'electron';


declare const POPUP_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
declare const POPUP_WINDOW_WEBPACK_ENTRY: string;

let popUpWindow: BrowserWindow;

export const registerPopUpIpc = (mainWindow: BrowserWindow) => {

    ipcMain.handle("info-message-show-popup", (event, message) => {
        popUpWindow = new BrowserWindow({
            width: 400,
            height: 200,
            parent: mainWindow, // optional: makes the popup a modal window
            modal: true, // optional: makes the popup a modal window
            webPreferences: {
                preload: POPUP_WINDOW_PRELOAD_WEBPACK_ENTRY,
                nodeIntegration: false,
                contextIsolation: true,
                nodeIntegrationInWorker: false,
                nodeIntegrationInSubFrames: false,
            }
        });

        popUpWindow.setMenu(null);

        popUpWindow.webContents.openDevTools();


        popUpWindow.on('closed', () => {
            popUpWindow = null;
        });

        popUpWindow.loadURL(POPUP_WINDOW_WEBPACK_ENTRY);

        // Send the message to the popup
        popUpWindow.webContents.on('did-finish-load', () => {
            console.log("send message " + message);
            popUpWindow.webContents.send('message', message);
        });
    });

    ipcMain.handle("info-message-close-popup", () => {
        if (popUpWindow) {
            popUpWindow.close();
            popUpWindow = null;
        }
    });
}