const {execFile} = require('child_process');

function start() {
    var dir = __dirname.replace("\\resources\\app.asar", "");
    execFile('./nginx.exe', null, {cwd: dir + "\\nginx"});
}

function stop() {
    var dir = __dirname.replace("\\resources\\app.asar", "");
    execFile('./nginx.exe', ['-s', 'stop'], {cwd: dir + "\\nginx"});
}

module.exports = {start, stop};