import { MutationTree } from 'vuex'
import { OptionStateInterface } from './state'

const mutation: MutationTree<OptionStateInterface> = {
  updatePopup (state: OptionStateInterface, updatePopup: boolean) {
    state.updatePopup = updatePopup
  }
}

export default mutation
