import { BrowserWindow, ipcMain, shell } from 'electron';


declare const POPUP_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
declare const POPUP_WINDOW_WEBPACK_ENTRY: string;

let popUpWindow: BrowserWindow;

export const registerPopUpIpc = (mainWindow: BrowserWindow) => {

    interface EventMessage {
        message: string,
        body: string
    }
    ipcMain.handle("info-message-show-popup", (event, eventMsg: EventMessage) => {

        popUpWindow = new BrowserWindow({
            width: 500,
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

        // popUpWindow.webContents.openDevTools();


        popUpWindow.on('closed', () => {
            popUpWindow = null;
        });

        popUpWindow.loadURL(POPUP_WINDOW_WEBPACK_ENTRY);
        console.log(JSON.stringify(eventMsg));
        // Send the message to the popup
        popUpWindow.webContents.on('did-finish-load', () => {
            console.log("send message " + eventMsg.message);
            console.log("send body " + eventMsg.body);

            popUpWindow.webContents.send('message', eventMsg.message, eventMsg.body);
        });
    });

    ipcMain.handle("info-message-close-popup", () => {
        if (popUpWindow) {
            popUpWindow.close();
            popUpWindow = null;
        }
    });
}