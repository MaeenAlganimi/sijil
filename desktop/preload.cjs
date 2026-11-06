const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('sijil', Object.freeze({ retry: () => ipcRenderer.send('sijil:retry') }));
