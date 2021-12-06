import { mapActions, mapGetters } from 'vuex'

export const StoreMixin = {
  name: 'StoreMixin',

  computed: {
    ...mapGetters('component_control', {
      getOpenNginxStatusAlert: 'openNginxStatusAlert',
      getOpenNginxStillRunningAlert: 'openNginxStillRunningAlert',
      getOpenPathErrorAlert: 'openPathErrorAlert',
      getOpenUpdateAlert: 'openUpdateAlert'
    }),

    ...mapGetters('key', {
      getTwitchKey: 'twitchKey',
      getYoutubeKey: 'youtubeKey',
      getAdditionalRTMPUrl: 'additionalRTMPUrl',
      getAdditionalRTMPKey: 'additionalRTMPKey',
      getFullTwitchUrl: 'fullTwitchUrl',
      getFullYoutubeUrl: 'fullYoutubeUrl',
      getFullAdditionalUrl: 'fullAdditionalUrl'
    }),

    ...mapGetters('option', {
      getIsUpdatePopupEnable: 'isUpdatePopupEnable'
    }),

    ...mapGetters('nginx', {
      getIsNginxRunning: 'isNginxRunning',
      getIsNginxStillRunning: 'isNginxStillRunning'
    }),

    ...mapGetters('path', {
      getDirname: 'dirname',
      getRootPath: 'rootPath',
      getNginxPath: 'nginxPath',
      getNginxConfPath: 'nginxConfPath',
      getNginxLogsPath: 'nginxLogsPath',
      getRecordingPath: 'recordingPath'
    }),

    ...mapGetters('toggle_switch', {
      getTwitchOn: 'twitchOn',
      getYoutubeOn: 'youtubeOn',
      getAdditionalOn: 'additionalOn',
      getRecordingOn: 'recordingOn'
    })
  },

  methods: {
    ...mapActions('component_control', {
      setOpenNginxStatusAlert: 'openNginxStatusAlert',
      setOpenNginxStillRunningAlert: 'openNginxStillRunningAlert',
      setOpenPathErrorAlert: 'openPathErrorAlert',
      setOpenUpdateAlert: 'openUpdateAlert'
    }),

    ...mapActions('key', {
      setTwitchKey: 'twitchKey',
      setYoutubeKey: 'youtubeKey',
      setAdditionalRTMPUrl: 'additionalRTMPUrl',
      setAdditionalRTMPKey: 'additionalRTMPKey'
    }),

    ...mapActions('nginx', {
      setIsNginxRunning: 'isNginxRunning',
      setIsNginxStillRunning: 'isNginxStillRunning'
    }),

    ...mapActions('option', {
      setIsUpdatePopupEnable: 'isUpdatePopupEnable'
    }),

    ...mapActions('path', {
      setRootPath: 'rootPath',
      setNginxPath: 'nginxPath',
      setNginxConfPath: 'nginxConfPath',
      setNginxLogsPath: 'nginxLogsPath',
      setRecordingPath: 'recordingPath'
    }),

    ...mapActions('toggle_switch', {
      setTwitchOn: 'twitchOn',
      setYoutubeOn: 'youtubeOn',
      setAdditionalOn: 'additionalOn',
      setRecordingOn: 'recordingOn'
    })
  }
}
