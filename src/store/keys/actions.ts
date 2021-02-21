import { ActionTree, ActionContext } from 'vuex'
import { StateInterface } from '../index'
import { KeyStateInterface } from './state'

const actions: ActionTree<KeyStateInterface, StateInterface> = {
  twitchKey (state: ActionContext<KeyStateInterface, StateInterface>, twitchKey: string) {
    state.commit('twitchKey', twitchKey)
  },

  youtubeKey (state: ActionContext<KeyStateInterface, StateInterface>, youtubeKey: string) {
    state.commit('youtubeKey', youtubeKey)
  },

  additionalRTMPUrl (state: ActionContext<KeyStateInterface, StateInterface>, additionalRTMPUrl: string) {
    state.commit('additionalRTMPUrl', additionalRTMPUrl)
  },

  additionalRTMPKey (state: ActionContext<KeyStateInterface, StateInterface>, additionalRTMPKey: string) {
    state.commit('additionalRTMPKey', additionalRTMPKey)
  }
}

export default actions
