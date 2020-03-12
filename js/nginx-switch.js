const {execFile, execFileSync} = require('child_process');

// nginx.exe 실행
function on() {
    const dir = __dirname.replace("\\resources\\app.asar", "");
    execFile('./nginx.exe', {cwd: dir + "\\nginx"}, (error, stdout, stderr) => {
        if(error) {
            let re = new RegExp('nginx.conf');
            if(re.exec(error)) {
                alert('nginx.conf 파일에 문제가 있는것 같습니다');
            } else {
                alert('원인을 알 수 없는 오류가 생겼습니다.');
            }

            document.getElementById('switch_button').setAttribute('value', 'nginx 서버 시작');
            document.getElementById('switch_button').setAttribute('class', 'btn btn-primary');
            ipcRenderer.send('asynchronous-message', 'false');
        }
    });
}

// nginx.exe 중단
function off() {
    const dir = __dirname.replace("\\resources\\app.asar", "");
    execFileSync('./nginx.exe', ['-s', 'stop'], {cwd: dir + "\\nginx"});
}