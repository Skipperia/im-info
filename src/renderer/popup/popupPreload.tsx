const { contextBridge, ipcRenderer } = require('electron');
import '@main/mainwindow/windowPreload';


contextBridge.exposeInMainWorld('electron', {
    recieveEventMessage: (channel: any, func: any) => {
        ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
});

// Say something
console.log('[IM-Info] : Preload execution started');


window.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popup');
    //todo: stuff to do when page loaded
});

