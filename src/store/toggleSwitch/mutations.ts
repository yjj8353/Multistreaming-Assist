import { MutationTree } from 'vuex'
import { ToggleSwitchStateInterface } from './state'

const mutation: MutationTree<ToggleSwitchStateInterface> = {
  twitchOn (state: ToggleSwitchStateInterface, twitchOn: boolean) {
    state.twitchOn = twitchOn
  },

  youtubeOn (state: ToggleSwitchStateInterface, youtubeOn: boolean) {
    state.youtubeOn = youtubeOn
  },

  additionalOn (state: ToggleSwitchStateInterface, additionalOn: boolean) {
    state.additionalOn = additionalOn
  },

  recordOn (state: ToggleSwitchStateInterface, recordOn: boolean) {
    state.recordOn = recordOn
  }
}

export default mutation
