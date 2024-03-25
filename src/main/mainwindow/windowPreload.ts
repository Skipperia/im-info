import { contextBridge } from 'electron';
import titlebarContext from './titlebarContext';
import popUpContext from './popUpContext';


contextBridge.exposeInMainWorld('electron_window', {
  titlebar: titlebarContext,
  popup: popUpContext
});
