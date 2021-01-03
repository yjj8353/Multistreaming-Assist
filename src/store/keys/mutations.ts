import { MutationTree } from 'vuex'
import { KeyStateInterface } from './state'

const mutation: MutationTree<KeyStateInterface> = {
  twitchKey (state: KeyStateInterface, twitchKey: string) {
    state.twitchKey = twitchKey
  },

  youtubeKey (state: KeyStateInterface, youtubeKey: string) {
    state.youtubeKey = youtubeKey
  },

  additionalRTMPUrl (state: KeyStateInterface, additionalRTMPUrl: string) {
    state.additionalRTMPUrl = additionalRTMPUrl
  },

  additionalRTMPKey (state: KeyStateInterface, additionalRTMPKey: string) {
    state.additionalRTMPKey = additionalRTMPKey
  }
}

export default mutation
