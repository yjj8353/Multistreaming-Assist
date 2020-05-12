import { execFile, execFileSync } from 'child_process'

export function startNginx () {
    execFile('./nginx_start.bat', { cwd: path.join(this.$store.state.dir, '\\nginx') }, (err, stdout, stderr) => {
        if (err) {
            this.notify('negative', 'nginx 실행에 실패했습니다')
            this.$store.commit('setNginxStatus', false)
        }
    })
}

export function stopNginx () {

}

export function quitNginx () {

}

export function testNginx () {

}