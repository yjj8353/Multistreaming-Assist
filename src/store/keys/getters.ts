import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { KeyStateInterface } from './state'

const getters: GetterTree<KeyStateInterface, StateInterface> = {
  twitchKey (state: KeyStateInterface): string {
    return state.twitchKey
  },

  youtubeKey (state: KeyStateInterface): string {
    return state.youtubeKey
  },

  additionalRTMPUrl (state: KeyStateInterface): string {
    return state.additionalRTMPUrl
  },

  additionalRTMPKey (state: KeyStateInterface): string {
    return state.additionalRTMPKey
  },

  fullTwitchUrl(state: KeyStateInterface): string {
    const fullTwitchUrl = state.twitchKey.trim() ? 'push rtmp://live-sel.twitch.tv/app/' + state.twitchKey.trim() + ';' : ''
    return fullTwitchUrl
  },

  fullYoutubeUrl(state: KeyStateInterface): string {
    const fullYoutubeUrl = state.youtubeKey.trim() ? 'push rtmp://a.rtmp.youtube.com/live2/' + state.youtubeKey.trim() + ';' : ''
    return fullYoutubeUrl
  },

  fullAdditionalUrl(state: KeyStateInterface): string {
    let fullAdditionalRTMPUrl = 'push ' + state.additionalRTMPUrl.trim() + '/' + state.additionalRTMPKey.trim() + ';'
    if(fullAdditionalRTMPUrl === 'push /') {
      fullAdditionalRTMPUrl = ''
    }

    return fullAdditionalRTMPUrl
  }
}

export default getters
