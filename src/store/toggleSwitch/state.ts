export interface ToggleSwitchStateInterface {
  twitchOn: boolean
  youtubeOn: boolean
  additionalOn: boolean
  recordOn: boolean
}

const state: ToggleSwitchStateInterface = {
  twitchOn: false,
  youtubeOn: false,
  additionalOn: false,
  recordOn: false
}

export default state
