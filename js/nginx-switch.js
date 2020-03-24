// nginx.exe 실행
exports.on = function() {
    // nginx.exe를 실행하고, 에러가 있을경우 에러 정보를 리턴하고 nginx.exe 시작 전 상태로 돌아감
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
exports.off = function () {
    //nginx.exe를 종료하고, 에러가 있을경우 nginx.exe 시작 전 상태로 돌아감
    execFileSync('./nginx.exe', ['-s', 'stop'], {cwd: dir + "\\nginx"}, (error, stdout, stderr) => {
        if(error) {
            document.getElementById('switch_button').setAttribute('value', 'nginx 서버 시작');
            document.getElementById('switch_button').setAttribute('class', 'btn btn-primary');
            ipcRenderer.send('asynchronous-message', 'false');
        }
    });
}
