export interface KeyStateInterface {
  twitchKey: string
  youtubeKey: string
  additionalRTMPUrl: string
  additionalRTMPKey: string
}

const state: KeyStateInterface = {
  twitchKey: '',
  youtubeKey: '',
  additionalRTMPUrl: '',
  additionalRTMPKey: ''
}

export default state
