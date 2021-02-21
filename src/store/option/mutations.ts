import { MutationTree } from 'vuex'
import { OptionStateInterface } from './state'

const mutation: MutationTree<OptionStateInterface> = {
  dontPopupUpdateMessage (state: OptionStateInterface, dontPopupUpdateMessage: boolean) {
    state.dontPopupUpdateMessage = dontPopupUpdateMessage
  }
}

export default mutation
