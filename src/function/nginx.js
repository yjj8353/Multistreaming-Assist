import { execFile, execFileSync } from 'child_process'

export function startNginx (setNginxStatus, path) {
    setNginxStatus.commit('setNginxStatus', true)

    execFile('nginx.exe', { cwd: path }, (err, stdout, stderr) => {
        if (err) {
            setNginxStatus.commit('setNginxStatus', false)
            return err;
        }
    })
}

export function stopNginx (path) {
    execFileSync('nginx.exe', ['-s', 'stop'], { cwd: path })
}

export function quitNginx (setNginxStatus, path) {
    execFileSync('nginx.exe', ['-s', 'quit'], { cwd: path })

    setNginxStatus.commit('setNginxStatus', false)
}

export function testNginx (path) {
    let result = new Result()

    execFileSync('nginx.exe', ['-t'], { cwd: path })

    return [result.getStdout(), result.getStderr()]
}

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