export function twitchKey(state) {
  return state.twitchKey
}

export function youtubeKey(state) {
  return state.youtubeKey
}

export function additionalRTMPUrl(state) {
  return state.additionalRTMPUrl
}

export function additionalRTMPKey(state) {
  return state.additionalRTMPKey
}

export function fullTwitchUrl(state) {
  const fullTwitchUrl = state.twitchKey.trim() ? 'push rtmp://live-sel.twitch.tv/app/' + state.twitchKey.trim() + ';' : ''
  return fullTwitchUrl
}

export function fullYoutubeUrl(state) {
  const fullYoutubeUrl = state.youtubeKey.trim() ? 'push rtmp://a.rtmp.youtube.com/live2/' + state.youtubeKey.trim() + ';' : ''
  return fullYoutubeUrl
}

export function fullAdditionalUrl(state) {
  let fullAdditionalRTMPUrl = 'push ' + state.additionalRTMPUrl.trim() + '/' + state.additionalRTMPKey.trim() + ';'
  
  if (fullAdditionalRTMPUrl === 'push /') {
    fullAdditionalRTMPUrl = ''
  }

  return fullAdditionalRTMPUrl
}