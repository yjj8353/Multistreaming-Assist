import { ActionTree, ActionContext } from 'vuex'
import { StateInterface } from '../index'
import { OptionStateInterface } from './state'

const actions: ActionTree<OptionStateInterface, StateInterface> = {
  updatePopup (state: ActionContext<OptionStateInterface, StateInterface>, updatePopup: boolean) {
    state.commit('updatePopup', updatePopup)
  }
}

export default actions
