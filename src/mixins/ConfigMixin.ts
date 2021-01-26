/*
 * Config File 관련기능
 */

import Vue from 'vue'
import Component from 'vue-class-component'
import { namespace } from 'vuex-class'

const dirStore = namespace('dir')
const keyStore = namespace('keys')
const optionStore = namespace('option')
const toggleSwitchStore = namespace('toggleSwitch')

@Component
export class ConfigMixin extends Vue {
  @dirStore.Getter('recordingDir') recordingDir!: string

  @keyStore.Getter('twitchKey') twitchKey!: string
  @keyStore.Getter('youtubeKey') youtubeKey!: string
  @keyStore.Getter('additionalRTMPUrl') additionalRTMPUrl!: string
  @keyStore.Getter('additionalRTMPKey') additionalRTMPKey!: string
  @keyStore.Getter('fullTwitchUrl') fullTwitchUrl!: string
  @keyStore.Getter('fullYoutubeUrl') fullYoutubeUrl!: string
  @keyStore.Getter('fullAdditionalUrl') fullAdditionalUrl!: string

  @optionStore.Getter('updatePopup') updatePopup!: boolean

  @toggleSwitchStore.Getter('twitchOn') twitchOn!: boolean
  @toggleSwitchStore.Getter('youtubeOn') youtubeOn!: boolean
  @toggleSwitchStore.Getter('additionalOn') additionalOn!: boolean
  @toggleSwitchStore.Getter('recordOn') recordOn!: boolean

  makeNginxConfString(): string {
    // recordingDir.length === 0 이거나 recordOn이 false면 녹화를 끔
    const recordOption = this.recordingDir.length !== 0 && this.recordOn ? '            record all;\n' +
                                                                           '            record_path "' + this.recordingDir.replace(/\\/g, '/') + '";\n' +
                                                                           '            record_unique on;' +
                                                                           '            record_suffix .flv;\n' : '            record off;\n'

    const twitchUrl = this.twitchOn ? this.fullTwitchUrl : ''
    const youtubeUrl = this.youtubeOn ? this.fullYoutubeUrl : ''
    const additionalRTMPUrl = this.additionalOn ? this.fullAdditionalUrl : ''

    const nginxConfig = 'worker_processes 1;\n' +
                        '\n' +
                        'error_log logs/error.log error;\n' +
                        '\n' +
                        'events {\n' +
                        '    worker_connections 1024;\n' +
                        '}\n' +
                        '\n' +
                        'rtmp {\n' +
                        '    server {\n' +
                        '        listen 1935;\n' +
                        '        chunk_size 4096;\n' +
                        '\n' +
                        '        application live {\n' +
                        '            live on;\n' +
                        '\n' +
                        recordOption +
                        '\n' +
                        '            ' + twitchUrl + '\n' +
                        '            ' + youtubeUrl + '\n' +
                        '            ' + additionalRTMPUrl + '\n' +
                        '        }\n' +
                        '    }\n' +
                        '}\n'

    return nginxConfig
  }

  makeKeyJSONString(): string {
    const keyJSON = '{\n' +
                    '    "twitch":' + '"' + this.twitchKey + '",\n' +
                    '    "youtube":' + '"' + this.youtubeKey + '",\n' +
                    '    "rtmpUrl":' + '"' + this.additionalRTMPUrl + '",\n' +
                    '    "rtmpKey":' + '"' + this.additionalRTMPKey + '",\n' +
                    '}\n'

    return keyJSON
  }

  makeOptionJONString(): string {
    const optionJSON = '{\n' +
                       '    "twitchOn":' + this.twitchOn.toString() + ',\n' +
                       '    "youtubeOn":' + this.youtubeOn.toString() + ',\n' +
                       '    "additionalOn":' + this.additionalOn.toString() + ',\n' +
                       '\n' +                        // 역슬래시 이스케이프
                       '    "recordingDir":' + '"' + this.recordingDir.replace(/\\/g, '\\\\') + '",\n' +
                       '\n' +
                       '    "recordOn":' + this.recordOn.toString() + ',\n' +
                       '\n' +
                       '    "updatePopup":' + this.updatePopup.toString() + '\n' +
                       '}' +
                       '\n'

    return optionJSON
  }
}
