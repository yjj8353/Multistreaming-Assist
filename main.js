const {app, BrowserWindow} = require('electron');
const fn = require('./js/function');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 500,
        height: 400,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile('view.html');
    //mainWindow.webContents.openDevTools();
    mainWindow.setMenuBarVisibility(false);
    mainWindow.on('close', () => {
        fn.stop();
    });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        fn.stop();
        app.quit();
    }
});
app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});