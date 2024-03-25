const { ipcRenderer } = require('electron');

ipcRenderer.on('message', (event, message) => {
    document.getElementById('message').innerText = message;
});


function closeWindow() {
    ipcRenderer.send('close-popup');
}

document.getElementById('closer').addEventListener('click', closeWindow);