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

    // 가끔 eslint 경고가 뜨는데, 버그이므로 신경쓰지 말 것
    const nginxConfig = stripIndent`
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
      }
    `
    
    return nginxConfig
  }

  makeBroadcastOptionJsonString(): string {
    // 가끔 eslint 경고가 뜨는데, 버그이므로 신경쓰지 말 것
    const json = stripIndent`
      {
          "keys": {
              "twitch":"${this.twitchKey}",
              "youtube":"${this.youtubeKey}",
              "rtmpUrl":"${this.additionalRTMPUrl}",
              "rtmpKey":"${this.additionalRTMPKey}"
          },
    
          "options": {
              "twitchOn":${this.twitchOn.toString()},
              "youtubeOn":${this.youtubeOn.toString()},
              "additionalOn":${this.additionalOn.toString()},
              "recordOn":${this.recordOn.toString()},
    
              "recordingDir":"${this.recordingDir.replace(/\\/g, '\\\\')}",
    
              "dontPopupUpdateMessage":${this.dontPopupUpdateMessage.toString()}
          }
      }
    `

    return json
  }
}
