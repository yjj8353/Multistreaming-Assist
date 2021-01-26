import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { namespace } from 'vuex-class'

const dirStore = namespace('dir')
const keyStore = namespace('keys')
const optionStore = namespace('option')
const toggleSwitchStore = namespace('toggleSwitch')

@Component
export class StoreMixin extends Vue {
  @dirStore.Getter('recordingDir') recordingDir!: string

  @keyStore.Getter('twitchKey') getTwitchKey!: string
  @keyStore.Getter('youtubeKey') getYoutubeKey!: string
  @keyStore.Getter('additionalRTMPUrl') getAdditionalRTMPUrl!: string
  @keyStore.Getter('additionalRTMPKey') getAdditionalRTMPKey!: string
  @keyStore.Getter('fullTwitchUrl') getFullTwitchUrl!: string
  @keyStore.Getter('fullYoutubeUrl') getFullYoutubeUrl!: string
  @keyStore.Getter('fullAdditionalUrl') getFullAdditionalUrl!: string

  @optionStore.Getter('updatePopup') getUpdatePopup!: boolean

  @toggleSwitchStore.Getter('twitchOn') getTwitchOn!: boolean
  @toggleSwitchStore.Getter('youtubeOn') getYoutubeOn!: boolean
  @toggleSwitchStore.Getter('additionalOn') getAdditionalOn!: boolean
  @toggleSwitchStore.Getter('recordOn') getRecordOn!: boolean
}