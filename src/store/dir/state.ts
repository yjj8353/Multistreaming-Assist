export interface DirStateInterface {
  dir: string
  rootDir: string
  nginxDir: string
  nginxConfDir: string
  nginxLogsDir: string
  recordingDir: string
}

const state: DirStateInterface = {
  dir: __dirname,
  rootDir: '',
  nginxDir: '',
  nginxConfDir: '',
  nginxLogsDir: '',
  recordingDir: ''
}

export default state
