import path from 'path'

export function rootDir(context, dir) {
    let rootDir = ''

    // 현재 ./dir의 위치에 따라 끝에 경로가 추가로 붙으므로 지워줘야 함
    // process.env.DEV는 quasar dev로 실행 했을 때 true가 된다
    if(process.env.DEV) {
        rootDir = dir.replace('src\\store\\dir', '')
    } else {
        rootDir = dir.replace('resources\\app.asar', '')
    }

    context.commit('rootDir', rootDir)
}

export function nginxDir(context, dir) {
    const nginxDir = path.join(dir, 'nginx')
    context.commit('nginxDir', nginxDir)
}

export function nginxConfDir(context, dir) {
    const nginxConfDir = path.join(dir, 'conf')
    context.commit('nginxConfDir', nginxConfDir)
}

export function nginxLogsDir (context, dir) {
    const nginxLogsDir = path.join(dir, 'logs')
    context.commit('nginxLogsDir', nginxLogsDir)
}

export function recordingDir(context, dir) {
    context.commit('recordingDir', dir)
}