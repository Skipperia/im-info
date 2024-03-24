import { BrowserWindow, ipcMain, shell } from 'electron';


let popUpWindow: BrowserWindow;

export const registerPopUpIpc = (mainWindow: BrowserWindow) => {

    ipcMain.addListener("info-message", (event , message) => {
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


        popUpWindow.loadFile('src/assets/htmls/popup.html');

        // Send the message to the popup
        popUpWindow.webContents.on('did-finish-load', () => {
            popUpWindow.webContents.send('message', message);
        });


    });
}