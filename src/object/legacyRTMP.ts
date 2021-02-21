export interface LegacyRTMP {
  twitch: string,
  youtube: string,
  rtmpUrl: string,
  rtmpKey: string, 

  twitchOn: boolean,
  youtubeOn: boolean,
  additionalOn: boolean,

  recordingDir: string,
  
  recordOn: boolean,

  updatePopup: boolean
}
