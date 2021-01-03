import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { OptionStateInterface } from './state'

const getters: GetterTree<OptionStateInterface, StateInterface> = {
  updatePopup (state: OptionStateInterface): boolean {
    return state.updatePopup
  }
}

export default getters
