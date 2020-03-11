const {app, BrowserWindow} = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 500,
        height: 400
    });

    mainWindow.loadFile('view.html');
    mainWindow.webContents.openDevTools();
    mainWindow.setMenuBarVisibility(false);
    mainWindow.on('close', () => {
        const fn = require('./js/function');
        fn.stop();

        mainWindow = null;
    });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});