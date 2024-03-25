import { ipcRenderer } from 'electron';


const popUpContext = {
    showPopUp(msg: string) {
        ipcRenderer.invoke('info-message-show-popup', msg);
    },
    closePopUp() {
        ipcRenderer.invoke('info-message-close-popup');
    }
}

export type popUpContextApi = typeof popUpContext;

export default popUpContext;