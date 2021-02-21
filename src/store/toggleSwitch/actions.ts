import { ActionTree, ActionContext } from 'vuex'
import { StateInterface } from '../index'
import { ToggleSwitchStateInterface } from './state'

const actions: ActionTree<ToggleSwitchStateInterface, StateInterface> = {
  twitchOn (state: ActionContext<ToggleSwitchStateInterface, StateInterface>, twitchOn: boolean) {
    state.commit('twitchOn', twitchOn)
  },

  youtubeOn (state: ActionContext<ToggleSwitchStateInterface, StateInterface>, youtubeOn: boolean) {
    state.commit('youtubeOn', youtubeOn)
  },

  additionalOn (state: ActionContext<ToggleSwitchStateInterface, StateInterface>, additionalOn: boolean) {
    state.commit('additionalOn', additionalOn)
  },

  recordOn (state: ActionContext<ToggleSwitchStateInterface, StateInterface>, recordOn: boolean) {
    state.commit('recordOn', recordOn)
  }
}

export default actions
