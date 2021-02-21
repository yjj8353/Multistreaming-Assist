import { MutationTree } from 'vuex'
import { NginxStateInterface } from './state'

const mutation: MutationTree<NginxStateInterface> = {
  nginxStatus(state: NginxStateInterface, nginxStatus: boolean) {
    state.nginxStatus = nginxStatus
  },

  nginxIsNotWorking(state: NginxStateInterface, nginxIsNotWorking: boolean) {
    state.nginxIsNotWorking = nginxIsNotWorking
  },

  checkBeforeCloseThisApp(state: NginxStateInterface, checkBeforeCloseThisApp: boolean) {
    state.checkBeforeCloseThisApp = checkBeforeCloseThisApp
  }
}

export default mutation
