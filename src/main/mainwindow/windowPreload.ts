import { contextBridge, ipcRenderer } from 'electron';
import titlebarContext from './titlebarContext';
import popUpContext from './popUpContext';


contextBridge.exposeInMainWorld('main_window', {
  setAdvancedView: (channel: any, func: any) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  }
});

contextBridge.exposeInMainWorld('electron_window', {
  titlebar: titlebarContext,
  popup: popUpContext
});
