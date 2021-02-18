/*
 * Config File 관련기능
 */

import { stripIndent } from 'common-tags'
import Component, { mixins } from 'vue-class-component'

import { StoreMixin } from 'src/mixins/StoreMixin'

@Component
export class ConfigMixin extends mixins(StoreMixin) {
  makeNginxConfString(): string {
    // recordingDir.length === 0 이거나 recordOn이 false면 녹화를 끔
    const recordOnOption = `
                  record all;
                  record_path "${this.recordingDir.replace(/\\/g, '/')}";
                  record_unique on;
                  record_suffix .flv;
    `
    const recordOffOption = `
                  record off;
    `
    const recordOption = this.recordingDir.length !== 0 && this.recordOn ? recordOnOption : recordOffOption

    const twitchUrl = this.twitchOn ? this.fullTwitchUrl : ''
    const youtubeUrl = this.youtubeOn ? this.fullYoutubeUrl : ''
    const additionalRTMPUrl = this.additionalOn ? this.fullAdditionalUrl : ''

    const nginxConfig = stripIndent(`
      worker_processes 1;
      
      error_log logs/error.log error;
      
      events {
          worker_connections 1024;
      }
      
      rtmp {
          server {
              listen 1935;
              chunk_size 4096;
      
              application live {
                  live on;      
      ${recordOption}
                  ${twitchUrl}
                  ${youtubeUrl}
                  ${additionalRTMPUrl}
              }
          }
      }`
    )

    return nginxConfig
  }

  makeBroadcastOptionJsonString(): string {
    const json = '{\n' +
                    '    "keys": {\n' +
                    '        "twitch":' + '"' + this.twitchKey + '",\n' +
                    '        "youtube":' + '"' + this.youtubeKey + '",\n' +
                    '        "rtmpUrl":' + '"' + this.additionalRTMPUrl + '",\n' +
                    '        "rtmpKey":' + '"' + this.additionalRTMPKey + '"\n' +
                    '    },\n' +
                    '\n' +
                    '    "options": {\n' +
                    '        "twitchOn":' + this.twitchOn.toString() + ',\n' +
                    '        "youtubeOn":' + this.youtubeOn.toString() + ',\n' +
                    '        "additionalOn":' + this.additionalOn.toString() + ',\n' +
                    '        "recordOn":' + this.recordOn.toString() + ',\n' +
                    '\n' +                        // 역슬래시 이스케이프
                    '        "recordingDir":' + '"' + this.recordingDir.replace(/\\/g, '\\\\') + '",\n' +
                    '\n' +
                    '        "dontPopupUpdateMessage":' + this.dontPopupUpdateMessage.toString() + '\n' +
                    '    }\n' +
                    '}\n'

    return json
  }
}
