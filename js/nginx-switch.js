const {execFile} = require('child_process');

// nginx.exe 실행
function on() {
    var dir = __dirname.replace("\\resources\\app.asar", "");
    execFile('./nginx.exe', null, {cwd: dir + "\\nginx"});
}

// nginx.exe 중단
function off() {
    var dir = __dirname.replace("\\resources\\app.asar", "");
    execFile('./nginx.exe', ['-s', 'stop'], {cwd: dir + "\\nginx"});
}