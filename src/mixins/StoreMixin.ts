import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { namespace } from 'vuex-class'

const dirStore = namespace('dir')
const keyStore = namespace('keys')
const nginxStore = namespace('nginx')
const optionStore = namespace('option')
const toggleSwitchStore = namespace('toggleSwitch')

@Component
export class StoreMixin extends Vue {
  @dirStore.Getter('rootDir') getRootDir!: string
  @dirStore.Getter('nginxDir') getNginxDir!: string
  @dirStore.Getter('nginxConfDir') getNginxConfDir!: string
  @dirStore.Getter('nginxLogsDir') getNginxLogsDir!: string
  @dirStore.Getter('recordingDir') geRecordingDir!: string
  @dirStore.Action('rootDir') setRootDir!: (value: string) => void
  @dirStore.Action('nginxDir') setNginxDir!: (value: string) => void
  @dirStore.Action('nginxConfDir') setNginxConfDir!: (value: string) => void
  @dirStore.Action('nginxLogsDir') setNginxLogsDir!: (value: string) => void
  @dirStore.Action('recordingDir') setRecordingDir!: (value: string) => void

  @keyStore.Getter('twitchKey') getTwitchKey!: string
  @keyStore.Getter('youtubeKey') getYoutubeKey!: string
  @keyStore.Getter('additionalRTMPUrl') getAdditionalRTMPUrl!: string
  @keyStore.Getter('additionalRTMPKey') getAdditionalRTMPKey!: string
  @keyStore.Getter('fullTwitchUrl') getFullTwitchUrl!: string
  @keyStore.Getter('fullYoutubeUrl') getFullYoutubeUrl!: string
  @keyStore.Getter('fullAdditionalUrl') getFullAdditionalUrl!: string
  @keyStore.Action('twitchKey') setTwitchKey!: (value: string) => void
  @keyStore.Action('youtubeKey') setYoutubeKey!: (value: string) => void
  @keyStore.Action('additionalRTMPUrl') setAdditionalRTMPUrl!: (value: string) => void
  @keyStore.Action('additionalRTMPKey') setAdditionalRTMPKey!: (value: string) => void

  @nginxStore.Getter('nginxStatus') getNginxStatus!: boolean
  @nginxStore.Action('nginxStatus') setNginxStatus!: (value: boolean) => void

  @optionStore.Getter('updatePopup') getUpdatePopup!: boolean
  @optionStore.Action('updatePopup') setUpdatePopup!: (value: boolean) => void

  @toggleSwitchStore.Getter('twitchOn') getTwitchOn!: boolean
  @toggleSwitchStore.Getter('youtubeOn') getYoutubeOn!: boolean
  @toggleSwitchStore.Getter('additionalOn') getAdditionalOn!: boolean
  @toggleSwitchStore.Getter('recordOn') getRecordOn!: boolean
  @toggleSwitchStore.Action('twitchOn') setTwitchOn!: (value: boolean) => void
  @toggleSwitchStore.Action('youtubeOn') setYoutubeOn!: (value: boolean) => void
  @toggleSwitchStore.Action('additionalOn') setAdditionalOn!: (value: boolean) => void
  @toggleSwitchStore.Action('recordOn') setRecordOn!: (vale: boolean) => void

  get twitchKey(): string { return this.getTwitchKey }
  set twitchKey(value: string) { this.setTwitchKey(value) }
  get youtubeKey(): string { return this.getYoutubeKey }
  set youtubeKey(value: string) { this.setYoutubeKey(value) }
  get additionalRTMPUrl(): string { return this.getAdditionalRTMPUrl }
  set additionalRTMPUrl(value: string) { this.setAdditionalRTMPUrl(value) }
  get additionalRTMPKey(): string { return this.getAdditionalRTMPKey }
  set additionalRTMPKey(value: string) { this.setAdditionalRTMPKey(value) }

  get nginxStatus(): boolean { return this.getNginxStatus }
  set nginxStatus(value: boolean) { this.setNginxStatus(value) }

  get twitchOn(): boolean { return this.getTwitchOn }
  set twitchOn(value: boolean) { this.setTwitchOn(value) }
  get youtubeOn(): boolean { return this.getYoutubeOn }
  set youtubeOn(value: boolean) { this.setYoutubeOn(value) }
  get additionalOn(): boolean { return this.getAdditionalOn }
  set additionalOn(value: boolean) { this.setAdditionalOn(value) }
}
