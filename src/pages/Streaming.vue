<template>
  <q-page class="q-pa-md" style="background-color: white;">

    <!-- TWITCH RTMP -->
    <div class="row">
      <!-- TWITCH RTMP KEY 입력 칸 -->
      <div class="col-11">
        <q-input label="TWITCH RTMP KEY" v-model="twitchKey" :type="twitchIsPwd ? 'password' : 'text'" @update:model-value="checkTwitchKeyEmpty">
          <template v-slot:append>
            <q-icon
              :name="twitchIsPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="twitchIsPwd = !twitchIsPwd"
            />
          </template>
        </q-input>
      </div>

      <!-- TWITCH RTMP KEY 반영 토글 스위치 -->
      <div class="col-1" style="display: flex; align-items: center; justify-content: center;">
        <q-toggle v-model="twitchOn" :disable="!twitchKey" size="md" />
      </div>
    </div>

    <p></p>

    <!-- YOUTUBE RTMP -->
    <div class="row">
      <!-- YOUTUBE RTMP KEY 입력 칸 -->
      <div class="col-11">
        <q-input label="YOUTUBE RTMP KEY" v-model="youtubeKey" :type="youtubeIsPwd ? 'password' : 'text'" @update:model-value="checkYoutubeKeyEmpty">
          <template v-slot:append>
            <q-icon
              :name="youtubeIsPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="youtubeIsPwd = !youtubeIsPwd"
            />
          </template>
        </q-input>
      </div>

      <!-- YOUTUBE RTMP KEY 반영 토글 스위치 -->
      <div class="col-1" style="display: flex; align-items: center; justify-content: center;">
        <q-toggle v-model="youtubeOn" :disable="!youtubeKey" size="md" />
      </div>
    </div>

    <p></p>

    <!-- additional RTMP -->
    <div class="row">
      <!-- 추가적인 RTMP URL 입력 칸 -->
      <div class="q-pr-md col">
        <q-input label="추가적인 RTMP URL" v-model="additionalRTMPUrl" type="text" @update:model-value="checkAdditionalRTMPUrlOrKeyEmpty">
          <template v-slot:append>
          </template>
        </q-input>
      </div>

      <!-- 추가적은 RTMP KEY 입력 칸 -->
      <div class="q-pl-md col">
        <q-input label="추가적인 RTMP KEY" v-model="additionalRTMPKey" :type="additionalIsPwd ? 'password' : 'text'" @update:model-value="checkAdditionalRTMPUrlOrKeyEmpty">
          <template v-slot:append>
            <q-icon
              :name="additionalIsPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="additionalIsPwd = !additionalIsPwd"
            />
          </template>
        </q-input>
      </div>

        <!-- 추가적인 RTMP URL 및 KEY 반영 토글 스위치 -->
      <div class="col-1" style="display: flex; align-items: center; justify-content: center;">
        <q-toggle size="md"
                  v-model="additionalOn"
                  :disable="!additionalRTMPUrl && !additionalRTMPKey"
        />
      </div>
    </div>

    <p></p>

    <!-- NGINX 시작/종료 버튼 -->
    <div class="row">
      <div class="q-pl-md col">
        <q-btn size="lg"
                class="float-right"
                :color="isNginxRunning ? 'red' : 'primary'"
                :label="isNginxRunning ? 'Nginx 종료' : 'Nginx 시작'"
                @click="nginxSwitch"
        />
      </div>
    </div>

  </q-page>
</template>

<script>
export default {
  name: 'Streaming',

  mounted() {
    this.settingPath(),
    this.settingBroadcastOption()
  },

  data() {
    return {
      twitchIsPwd: true,
      youtubeIsPwd: true,
      additionalIsPwd: true
    }
  },

  methods: {
    settingPath() {
      this.rootPath = this.dirname
      this.nginxPath = this.rootPath
      this.nginxConfPath = this.nginxPath
      this.nginxLogsPath = this.nginxPath
    },

    settingBroadcastOption() {
      const result = window.read.broadcastOption('broadcast-option', { nginxConfPath: this.nginxConfPath })

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
    },

    nginxSwitch() {
      // window.api.example("넘긴값", { value:1234, key:'key', calback: (result) => {
      //   console.log('요청 후 결과 값 : ', result);
      // }})

      const nginxConf = {
        path: this.nginxConfPath,
        data: this.makeNginxConfString()
      }

      const broadcastOption = {
        path: this.nginxConfPath,
        data: this.makeBroadcastOptionJsonString()
      }

      const result1 = window.write.makeNginxConf('make-nginx-conf', nginxConf)
      const result2 = window.write.makeBroadcastOption('make-broadcast-option', broadcastOption)

      if(!result1 || !result2) {
        this.notify('negative', '옵션 파일을 생성하는데 실패했습니다')
        return
      }

      if(!this.isNginxRunning) {
        const option = {
          nginxLogsPath: this.nginxLogsPath,
          nginxPath: this.nginxPath
        }

        const result = window.nginx.start(option)
        const re = result.result

        if(re) {
          this.isNginxRunning = true
        } else {
          this.isNginxRunning = false
          this.notify(re.type, re.message)
        }
      } else {
        window.nginx.stop()
        this.isNginxRunning = false
      }
    },

    checkTwitchKeyEmpty() {
      const result = this.isTwitchKeyEmpty(this.twitchKey)
      
      if(result) {
        this.twitchOn = false
      }
    },

    checkYoutubeKeyEmpty() {
      const result = this.isYoutubeKeyEmpty(this.youtubeKey)

      if(result) {
        this.youtubeOn = false
      }
    },

    checkAdditionalRTMPUrlOrKeyEmpty() {
      const result1 = this.isAdditionalRTMPUrlEmpty(this.additionalRTMPUrl)
      const result2 = this.isAdditionalKeyEmpty(this.additionalRTMPKey)

      if(result1 && result2) {
        this.additionalOn =  false
      } 
    }
  }
}
</script>