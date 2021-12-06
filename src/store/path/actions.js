export function rootPath(state, dirname) {
  let rootPath

  // 현재 ./dir의 위치에 따라 끝에 경로가 추가로 붙으므로 지워줘야 함
  // process.env.DEV는 quasar dev로 실행 했을 때 true가 된다
  // Windows만 적용됨, MacOS/Linux는 \\가 아니라 /로 바꿔야 함
  if(process.env.DEV) {
    rootPath = dirname.replace('src-electron', '')
  } else {
    rootPath = dirname.replace('resources\\app.asar', '')
  }

  state.commit('rootPath', rootPath)
}

export function nginxPath(state, rootPath) {
  const nginxPath = rootPath + 'nginx'
  state.commit('nginxPath', nginxPath)
}

export function nginxConfPath(state, nginxPath) {
  const nginxConfPath = nginxPath + '\\conf'
  state.commit('nginxConfPath', nginxConfPath)
}

export function nginxLogsPath(state, nginxPath) {
  const nginxLogsPath = nginxPath + '\\logs'
  state.commit('nginxLogsPath', nginxLogsPath)
}

export function recordingPath(state, recordingPath) {
  state.commit('recordingPath', recordingPath)
}
