<template>
  <q-layout class="shadow-2 rounded-borders">
    <Header />
    <q-page-container>
      <Body />
    </q-page-container>
  </q-layout>
</template>

<script>
import Header from './layouts/Header.vue'
import Body from './layouts/Body.vue'
export default {
  name: 'App',

  components: {
    Header,
    Body
  },

  mounted() {
    this.settingPath(),
    this.settingBroadcastOption()
  },

  methods: {
    settingPath() {
      this.rootPath = this.dirname
      this.nginxPath = this.rootPath
      this.nginxConfPath = this.nginxPath
      this.nginxLogsPath = this.nginxPath
    },
    
    settingBroadcastOption() {
      const result = this.readBroadcastOption()

      if(result) {
        this.twitchKey = result.keys.twitch
        this.youtubeKey = result.keys.youtube
        this.additionalRTMPUrl = result.keys.rtmpUrl
        this.additionalRTMPKey = result.keys.rtmpKey

        this.twitchOn = result.options.twitchOn
        this.youtubeOn = result.options.youtubeOn
        this.additionalOn = result.options.additionalOn
        this.recordingOn = result.options.recordingOn

        this.recordingPath = result.options.recordingPath
        
        this.isUpdatePopupEnable = result.options.isUpdatePopupEnable
      }
    }
  }
}
</script>
