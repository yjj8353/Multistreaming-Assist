const {app, BrowserWindow} = require('electron');

// 메인 화면 생성 및 설정
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 500,
        height: 400,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // 메인 화면으로 사용할 화면 로드
    mainWindow.loadFile('view.html');
    
    // 개발자용 도구 활성화
    //mainWindow.webContents.openDevTools();

    // 상단 메뉴 활성화 여부
    mainWindow.setMenuBarVisibility(false);

    // 화면 종료시 실행하는 이벤트
    mainWindow.on('close', () => {
        
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