import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { ToggleSwitchStateInterface } from './state'

const getters: GetterTree<ToggleSwitchStateInterface, StateInterface> = {
  twitchOn (state: ToggleSwitchStateInterface): boolean {
    return state.twitchOn
  },

  youtubeOn (state: ToggleSwitchStateInterface): boolean {
    return state.youtubeOn
  },

  additionalOn (state: ToggleSwitchStateInterface): boolean {
    return state.additionalOn
  },

  recordOn (state: ToggleSwitchStateInterface): boolean {
    return state.recordOn
  }
}

export default getters
