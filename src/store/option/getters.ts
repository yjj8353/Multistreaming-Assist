import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { OptionStateInterface } from './state'

const getters: GetterTree<OptionStateInterface, StateInterface> = {
  dontPopupUpdateMessage (state: OptionStateInterface): boolean {
    return state.dontPopupUpdateMessage
  }
}

export default getters
