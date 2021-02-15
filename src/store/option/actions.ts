import { ActionTree, ActionContext } from 'vuex'
import { StateInterface } from '../index'
import { OptionStateInterface } from './state'

const actions: ActionTree<OptionStateInterface, StateInterface> = {
  dontPopupUpdateMessage (state: ActionContext<OptionStateInterface, StateInterface>, dontPopupUpdateMessage: boolean) {
    state.commit('dontPopupUpdateMessage', dontPopupUpdateMessage)
  }
}

export default actions
