import { BrowserWindow, ipcMain, shell } from 'electron';



let popUpWindow: BrowserWindow;

export const registerPopUpIpc = (mainWindow: BrowserWindow) => {

    ipcMain.handle("info-message-show-popup", (event, message) => {
        popUpWindow = new BrowserWindow({
            width: 400,
            height: 200,
            parent: mainWindow, // optional: makes the popup a modal window
            modal: true, // optional: makes the popup a modal window
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        });

        popUpWindow.setMenu(null);

        popUpWindow.on('closed', () => {
            popUpWindow = null;
        });

        popUpWindow.loadFile("");

        // Send the message to the popup
        popUpWindow.webContents.on('did-finish-load', () => {
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