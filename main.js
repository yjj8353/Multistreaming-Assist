const {app, BrowserWindow, ipcMain, dialog} = require('electron');
const {execFileSync}                        = require('child_process');

// 메인 화면 생성 및 설정
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 520,
        height: 450,
        frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // 개발자용 도구 활성화
    //mainWindow.webContents.openDevTools();

    // nginx.exe가 현재 실행되고 있는지 여부
    var switchStatus = "false";

    // view.html에서 nginx.exe의 on/off 여부를 받는 이벤트
    ipcMain.on('asynchronous-message', (event, arg) => {
        switchStatus = arg;
    })

    // 메인 화면으로 사용할 화면 로드
    mainWindow.loadFile('view.html');

    // 상단 메뉴 활성화 여부
    mainWindow.setMenuBarVisibility(false);

    // 프로그램 종료시, nginx가 켜져있을 경우 경고창을 띄움
    mainWindow.on('close', (event) => {
        if(switchStatus === "true") {
            let response = dialog.showMessageBoxSync({
                title: '잠깐만요!',
                type: 'warning',
                buttons: ['네', '아니오'],
                message: '아직 nginx가 켜져있는거 같습니다만... 정말로 종료할까요?'
            });

            // '네'
            if(response === 0) {
                var dir = __dirname.replace("\\resources\\app.asar", "");
                execFileSync('./nginx.exe', ['-s', 'stop'], {cwd: dir + "\\nginx"});
            }
            // '아니오'
            if(response === 1) {
                event.preventDefault();
            }
        }
    });
}

require('./js/custom-menu.js');

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