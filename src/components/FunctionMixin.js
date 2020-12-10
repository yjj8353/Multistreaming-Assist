// vuex
import { mapGetters } from 'vuex'

export const FunctionMixin = {
  computed: {
    ...mapGetters('dir', {
      getRecordingDir: 'recordingDir'
    }),

    ...mapGetters('option', {
      getUpdatePopup: 'updatePopup'
    }),

    ...mapGetters('keys', {
      getTwitchKey: 'twitchKey',
      getYoutubeKey: 'youtubeKey',
      getAdditionalRTMPUrl: 'additionalRTMPUrl',
      getAdditionalRTMPKey: 'additionalRTMPKey',
      getFullTwitchUrl: 'fullTwitchUrl',
      getFullYoutubeUrl: 'fullYoutubeUrl',
      getFullAdditionalRTMPUrl: 'fullAdditionalRTMPUrl'
    }),

    ...mapGetters('toggleSwitch', {
      getTwitchOn: 'twitchOn',
      getYoutubeOn: 'youtubeOn',
      getAdditionalOn: 'additionalOn',
      getRecordOn: 'recordOn'
    }),

    recordingDir: {
      get() { return this.getRecordingDir }
    },

    twitchKey: {
      get() { return this.getTwitchKey }
    },

    youtubeKey: {
      get() { return this.getYoutubeKey }
    },

    additionalRTMPUrl: {
      get() { return this.getAdditionalRTMPUrl }
    },

    additionalRTMPKey: {
      get() { return this.getAdditionalRTMPKey }
    },

    twitchOn: {
      get() { return this.getTwitchOn }
    },

    youtubeOn: {
      get() { return this.getYoutubeOn }
    },

    additionalOn: {
      get() { return this.getAdditionalOn }
    },

    recordOn: {
      get() { return this.getRecordOn }
    },

    fullTwitchUrl: {
      get() { return this.getFullTwitchUrl }
    },

    fullYoutubeUrl: {
      get() { return this.getFullYoutubeUrl }
    },

    fullAdditionalRTMPUrl: {
      get() { return this.getFullAdditionalRTMPUrl }
    },

    updatePopup: {
      get() { return this.getUpdatePopup }
    }
  },

  methods: {
    async checkKey() {
      const twitchKeyCheckResult = this.twitchKey ? await checkTwitchKeyPattern(this.twitchKey) : true
      const youtubeKeyCheckResult = this.youtubeKey ? await checkYoutubeKeyPattern(this.youtubeKey) : true

      async function checkTwitchKeyPattern (twitch) {
        const re = new RegExp('^live_[0-9]*_[a-zA-Z0-9]{30}$')
        return re.test(twitch)
      }
      
      async function checkYoutubeKeyPattern (youtube) {
        const re = new RegExp('^[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}(-[a-z0-9]{4})?$')
        return re.test(youtube)
      }

      const results = {
        twitch: twitchKeyCheckResult,
        youtube: youtubeKeyCheckResult
      }

      return results
    },

    async makeNginxConfFile() {                                              // recordingDir.length === 0 이거나 recordOn이 false면 녹화를 끔
      const recordOption = this.recordingDir.length !== 0 && this.recordOn ? '            record all;\n' +
                                                                             '            record_path "' + this.recordingDir.replace(/\\/g, '/') + '";\n' +
                                                                             '            record_unique on;' +
                                                                             '            record_suffix .flv;\n' : '            record off;\n'

      const fullTwitchUrl = this.twitchOn ? this.fullTwitchUrl : ''
      const fullYoutubeUrl = this.youtubeOn ? this.fullYoutubeUrl : ''
      const fullAdditionalRTMPUrl = this.additionalOn ? this.fullAdditionalRTMPUrl : ''
 
      const config = 'worker_processes 1;\n' +
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
                    '            ' + fullTwitchUrl + '\n' +
                    '            ' + fullYoutubeUrl + '\n' +
                    '            ' + fullAdditionalRTMPUrl + '\n' +
                    '        }\n' +
                    '    }\n' +
                    '}\n' +
                    '\n'

      return config
    },

    async makeRTMPJSONFile() {
      const rtmpJSON = '{\n' +
                       '    "twitch":' + '"' + this.twitchKey + '",\n' +
                       '    "youtube":' + '"' + this.youtubeKey + '",\n' +
                       '    "rtmpUrl":' + '"' + this.additionalRTMPUrl + '",\n' +
                       '    "rtmpKey":' + '"' + this.additionalRTMPKey + '",\n' +
                       '\n' +
                       '    "twitchOn":' + this.twitchOn + ',\n' +
                       '    "youtubeOn":' + this.youtubeOn + ',\n' +
                       '    "additionalOn":' + this.additionalOn + ',\n' +
                       '\n' +                        // 역슬래시 이스케이프
                       '    "recordingDir":' + '"' + this.recordingDir.replace(/\\/g, '\\\\') + '",\n' +
                       '\n' +
                       '    "recordOn":' + this.recordOn + ',\n' +
                       '\n' +
                       '    "updatePopup":' + this.updatePopup + '\n' +
                       '}'

      return rtmpJSON
    },

    // 사용자에게 알림 메시지를 보여줌
    notify(type, message) {
      this.$q.notify({
        type: type,
        message: message
      })
    }
  }
}
