import { MutationTree } from 'vuex'
import { DirStateInterface } from './state'

const mutation: MutationTree<DirStateInterface> = {
  dir (state: DirStateInterface, dir: string) {
    state.dir = dir
  },

  rootDir (state: DirStateInterface, rootDir: string) {
    state.rootDir = rootDir
  },

  nginxDir (state: DirStateInterface, nginxDir: string) {
    state.nginxDir = nginxDir
  },

  nginxConfDir (state: DirStateInterface, nginxConfDir: string) {
    state.nginxConfDir = nginxConfDir
  },

  nginxLogsDir (state: DirStateInterface, nginxLogsDir: string) {
    state.nginxLogsDir = nginxLogsDir
  },

  recordingDir (state: DirStateInterface, recordingDir: string) {
    state.recordingDir = recordingDir
  }
}

export default mutation
