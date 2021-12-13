import { stripIndent } from 'common-tags'

export const ConfigMixin = {
  name: 'ConfigMixin',

  methods: {
    _makeNginxConfString() {
      const recordingOnOption = `
                    record all;
                    record_path "${this.recordingPath.replace(/\\/g, '/')}";
                    record_unique on;
                    record_suffix .flv;
      `
      const recordingOffOption = `
                    record off;
      `
      const recordingOption = this.recordingPath.length !== 0 && this.recordingOn ? recordingOnOption : recordingOffOption

      const twitchUrl = this.twitchOn ? this.fullTwitchUrl : ''
      const youtubeUrl = this.youtubeOn ? this.fullYoutubeUrl : ''
      const additionalRTMPUrl = this.additionalOn ? this.fullAdditionalUrl : ''

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
        ${recordingOption}
                    ${twitchUrl}
                    ${youtubeUrl}
                    ${additionalRTMPUrl}
                }
            }
        }
      `

      return nginxConfig
    },

    _makeBroadcastOptionJsonString() {
      const json = stripIndent`
        {
            "keys": {
                "twitch":"${this.twitchKey}",
                "youtube":"${this.youtubeKey}",
                "rtmpUrl":"${this.additionalRTMPUrl}",
                "rtmpKey":"${this.additionalRTMPKey}"
            },
      
            "options": {
                "twitchOn":${this.twitchOn},
                "youtubeOn":${this.youtubeOn},
                "additionalOn":${this.additionalOn},
                "recordingOn":${this.recordingOn},
      
                "recordingPath":"${this.recordingPath.replace(/\\/g, '\\\\')}",
      
                "isUpdatePopupEnable":${this.isUpdatePopupEnable}
            }
        }
      `

      return json
    },

    writeBroadcastOption() {
      const broadcastOption = {
        path: this.nginxConfPath,
        data: this._makeBroadcastOptionJsonString()
      }

      window.write.broadcastOption('make-broadcast-option', broadcastOption)
    },

    writeNginxConf() {
      const nginxConf = {
        path: this.nginxConfPath,
        data: this._makeNginxConfString()
      }

      window.write.nginxConf('make-nginx-conf', nginxConf)
    },

    readBroadcastOption() {
      return window.read.broadcastOption('broadcast-option', { nginxConfPath: this.nginxConfPath })
    },

    readContributors() {
      return window.read.contributors('contributors', this.rootPath)
    }
  }
}
