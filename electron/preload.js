const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  windowControls: (command) => ipcRenderer.send('window-controls', command),
});