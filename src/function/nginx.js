import { execFile, execFileSync, execSync } from 'child_process'

export function startNginx (path) {
    execFile('nginx.exe', { cwd: path }, (err, stdout, stderr) => {
        if (err) {
            return err;
        }
    })
}

export function quitNginx () {
    let result
    let error

    try {
        // tasklist /fi nginx.exe를 쓰면 실행중인 nginx.exe를 찾을 수 있음
        result = execSync('taskkill /im nginx.exe /f')
    } catch (err) {
        error = err.stderr.toString()
    }

    result = result.toString()

    return [result, error]
}

export function testNginx (path) {
    let result = new Result()

    execFileSync('nginx.exe', ['-t'], { cwd: path })

    return [result.getStdout(), result.getStderr()]
}

// 이유는 모르겠으나 quasar는 child_process의 execFileSync result가 들어오지 않으므로 main process의
// stdout stderr를 가로채서 만들어야 함
class Result {
    constructor() {
        this.stdout = []
        this.stderr = []

        this.stdoutUse()
        this.stderrUse()
    }

    stdoutUse () {
        let stdout = []

        process.stdout.write = function(str, encoding, fg) {
            stdout.push(str.toString());
        }

        this.stdout = stdout
    }

    stderrUse () {
        let stderr = []
        
        process.stderr.write = function(str, encoding, fg) {
            stderr.push(str.toString())
        }

        this.stderr = stderr
    }

    getStdout () {
        return this.stdout[0]
    }

    getStderr () {
        return this.stderr[0]
    }
}