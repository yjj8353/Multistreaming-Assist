const {app, BrowserWindow, ipcMain} = require('electron');
const {execFileSync}                = require('child_process');

// 메인 화면 생성 및 설정
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 520,
        height: 450,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // nginx.exe가 현재 실행되고 있는지 여부
    var switchStatus = "false";

    // view.html에서 nginx.exe의 on/off 여부를 받는 이벤트
    ipcMain.on('asynchronous-message', (event, arg) => {
        switchStatus = arg;
    })

    // 메인 화면으로 사용할 화면 로드
    mainWindow.loadFile('view.html');
    
    // 개발자용 도구 활성화
    //mainWindow.webContents.openDevTools();

    // 상단 메뉴 활성화 여부
    mainWindow.setMenuBarVisibility(false);

    // 화면 종료시 실행하는 이벤트
    // 화면 종료시 nginx.exe가 실행중이면 종료하고 창을 닫음
    mainWindow.on('close', () => {
        if(switchStatus == "true") {
            var dir = __dirname.replace("\\resources\\app.asar", "");
            execFileSync('./nginx.exe', ['-s', 'stop'], {cwd: dir + "\\nginx"});
        }
    });
}

// app이 준비 되었을때 발생하는 이벤트
app.on('ready', createWindow);

// 모든 window가 닫힐때 발생하는 이벤트
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