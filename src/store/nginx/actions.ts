import { ActionTree, ActionContext } from 'vuex'
import { StateInterface } from '../index'
import { NginxStateInterface } from './state'

const actions: ActionTree<NginxStateInterface, StateInterface> = {
  nginxStatus (state: ActionContext<NginxStateInterface, StateInterface>, nginxStatus: boolean) {
    state.commit('nginxStatus', nginxStatus)
  }
}

export default actions
