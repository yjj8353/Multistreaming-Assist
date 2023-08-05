import { stripIndent } from "common-tags";
import { invoke } from "@tauri-apps/api";
import { StoreMixin } from "./store";

export const ConfigMixin = {
  name: "ConfigMixin",

  mixins: [StoreMixin],

  methods: {
    _makeNginxConfString() {
      const recordingOnOption = `
                    record all;
                    record_path "${this.recordingPath.replace(/\\/g, "/")}";
                    record_unique on;
                    record_suffix .flv;
      `;
      const recordingOffOption = `
                    record off;
      `;
      const recordingOption =
        this.recordingPath.length !== 0 && this.isRecordingOn
          ? recordingOnOption
          : recordingOffOption;

      const twitchUrl = this.isTwitchOn ? this.fullTwitchUrl : "";
      const youtubeUrl = this.isYoutubeOn ? this.fullYoutubeUrl : "";
      const additionalRTMPUrl = this.isAdditionalOn
        ? this.fullAdditionalUrl
        : "";

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
      `;

      return nginxConfig;
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
                "twitchOn":${this.isTwitchOn},
                "youtubeOn":${this.isYoutubeOn},
                "additionalOn":${this.isAdditionalOn},
                "recordingOn":${this.isRecordingOn},
      
                "recordingPath":"${this.recordingPath.replace(/\\/g, "\\\\")}",
      
                "isUpdatePopupEnable":${this.isUpdatePopupEnable}
            }
        }
      `;

      return json;
    },

    async writeBroadcastOption() {
      const broadcastOption = {
        path: this.nginxConfPath,
        data: this._makeBroadcastOptionJsonString(),
      };

      return await invoke("write_broadcast_option", {
        filePath: broadcastOption.path,
        data: broadcastOption.data,
      });
    },

    async writeNginxConf() {
      const nginxConf = {
        path: this.nginxConfPath,
        data: this._makeNginxConfString(),
      };

      return await invoke("write_nginx_conf", {
        filePath: nginxConf.path,
        data: nginxConf.data,
      });
    },

    async readBroadcastOption() {
      // return invoke('broadcast-option', { nginxConfPath: this.nginxConfPath })
    },

    async readContributors() {
      return await invoke("read_contributors", {
        path: "D:\\git\\rust\\Multistreaming Assist V2\\contributors.md",
      });
    },
  },
};
