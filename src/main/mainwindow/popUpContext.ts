import { ipcRenderer } from 'electron';


const popUpContext = {
    showPopUp(eventMessage: { message: string, body: string }) {
        ipcRenderer.invoke('info-message-show-popup', eventMessage);
    },
    closePopUp() {
        ipcRenderer.invoke('info-message-close-popup');
    }
}

export type popUpContextApi = typeof popUpContext;

export default popUpContext;