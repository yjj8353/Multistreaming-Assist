import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { NginxStateInterface } from './state'

const getters: GetterTree<NginxStateInterface, StateInterface> = {
  nginxStatus(state: NginxStateInterface): boolean {
    return state.nginxStatus
  },

  nginxIsNotWorking(state: NginxStateInterface): boolean {
    return state.nginxIsNotWorking
  }
}

export default getters
