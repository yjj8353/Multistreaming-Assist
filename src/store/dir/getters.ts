import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { DirStateInterface } from './state'

const getters: GetterTree<DirStateInterface, StateInterface> = {
  dir (state: DirStateInterface): string {
    return state.dir
  },

  rootDir (state: DirStateInterface): string {
    return state.rootDir
  },

  nginxDir (state: DirStateInterface): string {
    return state.nginxDir
  },

  nginxConfDir (state: DirStateInterface): string {
    return state.nginxConfDir
  },

  nginxLogsDir (state: DirStateInterface): string {
    return state.nginxLogsDir
  },

  recordingDir (state: DirStateInterface): string {
    return state.recordingDir
  }
}

export default getters
