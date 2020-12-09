<template>
  <q-page class="q-pa-md" style="background-color: white;">

    <!-- TWITCH RTMP KEY 입력 칸 -->
    <div class="row">
      <div class="col-11">
        <q-input label="TWITCH RTMP KEY" v-model="twitchKey" :type="twitchIsPwd ? 'password' : 'text'" @input="checkTwitchKeykNull">
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

    <!-- YOUTUBE RTMP KEY 입력 칸 -->
    <div class="row">
      <div class="col-11">
        <q-input label="YOUTUBE RTMP KEY" v-model="youtubeKey" :type="youtubeIsPwd ? 'password' : 'text'" @input="checkYoutubeKeyNull">
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

    <!-- 추가적인 RTMP URL 입력 칸 -->
    <div class="row">
      <div class="q-pr-md col">
        <q-input label="추가적인 RTMP URL" v-model="additionalRTMPUrl" type="text" @input="checkAddtionalRTMPUrlOrKeyNull">
          <template v-slot:append>
          </template>
        </q-input>
      </div>

      <!-- 추가적은 RTMP KEY 입력 칸 -->
      <div class="q-pl-md col">
        <q-input label="추가적인 RTMP KEY" v-model="additionalRTMPKey" :type="additionalIsPwd ? 'password' : 'text'" @input="checkAddtionalRTMPUrlOrKeyNull">
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
                  :disable="!additionalRTMPUrl || !additionalRTMPKey"
        />
      </div>
    </div>

    <p></p>

    <!-- NGINX 시작/종료 버튼 -->
    <div class="row">
      <div class="q-pl-md col">
        <q-btn size="lg"
                class="float-right"
                :color="nginxStatus ? 'red' : 'primary'"
                :label="nginxStatus ? 'Nginx 종료' : 'Nginx 시작'"
                @click="nginxSwitch"
        />
      </div>
    </div>

    <div class="q-pa-md q-gutter-sm">
      <q-dialog v-model="seamless" seamless position="bottom">
        <q-card style="width: 400px">
          <q-card-section class="row items-center no-wrap text-weight-bold">
            업데이트가 있습니다, 다운로드 하시겠습니까?
          </q-card-section>
          <q-separator />
          <q-card-section class="row no-wrap">
            <q-checkbox v-model="fuckYouUpdate" label="앞으로 업데이트 알림을 보지 않습니다" />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn label="귀찮아요" color="negative" @click="closeUpdatePopup" />
            <q-btn label="할게요" color="primary" @click="openUpdatePage" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

  </q-page>
</template>

<script>
import fs from 'fs'
import path from 'path'
import https from 'follow-redirects/https'

// electron
import { shell } from 'electron'

// Mixin
import { NginxMixin } from '../components/NginxMixin'
import { FunctionMixin } from '../components/FunctionMixin'

// vuex
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  name: 'StreamingPage',
  
  mixins: [NginxMixin, FunctionMixin],

  computed: {
    ...mapGetters('option', {
      getUpdatePopup: 'updatePopup'
    }),

    ...mapGetters('nginx', {
      getNginxStatus: 'nginxStatus'
    }),
    
    ...mapGetters('dir', {
      getDir: 'dir',
      getRootDir: 'rootDir',
      getNginxDir: 'nginxDir',
      getNginxConfDir: 'nginxConfDir',
      getRecordingDir: 'recordingDir'
    }),

    ...mapGetters('keys', {
      getTwitchKey: 'twitchKey',
      getYoutubeKey: 'youtubeKey',
      getAdditionalRTMPUrl: 'additionalRTMPUrl',
      getAdditionalRTMPKey: 'additionalRTMPKey'
    }),

    ...mapGetters('toggleSwitch', {
      getTwitchOn: 'twitchOn',
      getYoutubeOn: 'youtubeOn',
      getAdditionalOn: 'additionalOn',
      getRecordOn: 'recordOn'
    }),

    dir: {
      get() { return this.getDir }
    },

    rootDir: {
      get() { return this.getRootDir }
    },

    nginxDir: {
      get() { return this.getNginxDir }
    },

    nginxConfDir: {
      get() { return this.getNginxConfDir }
    },

    recordingDir: {
      get() { return this.getRecordingDir },
      set(value) { this.setRecordingDir(value) }
    },

    twitchKey: {
      get() { return this.getTwitchKey },
      set(value) { this.setTwitchKey(value) }
    },

    youtubeKey: {
      get() { return this.getYoutubeKey },
      set(value) { this.setYoutubeKey(value) }
    },

    additionalRTMPUrl: {
      get() { return this.getAdditionalRTMPUrl },
      set(value) { this.setAdditionalRTMPUrl(value) }
    },

    additionalRTMPKey: {
      get() { return this.getAdditionalRTMPKey },
      set(value) { this.setAdditionalRTMPKey(value) }
    },

    nginxStatus: {
      get() { return this.getNginxStatus },
      set(value) { this.setNginxStatus(value) }
    },

    twitchOn: {
      get() { return this.getTwitchOn },
      set(value) { this.setTwitchOn(value) }
    },

    youtubeOn: {
      get() { return this.getYoutubeOn },
      set(value) { this.setYoutubeOn(value) }
    },

    additionalOn: {
      get() { return this.getAdditionalOn },
      set(value) { this.setAdditionalOn(value) }
    },

    recordOn: {
      get() { return this.getRecordOn },
      set(value) { this.setRecordOn(value) }
    },

    updatePopup: {
      get() { return this.getUpdatePopup },
      set(value) { this.setUpdatePopup(value) }
    }
  },

  // 페이지가 마운트시 실행되는 메소드
  mounted () {
    window.addEventListener('load', async() => {
      await this.updateCheck()
      this.getSaveKey()
      this.turnOnSwitch()
    })

    this.updateMessage()
  },

  // 페이지에서 사용되는 데이터 변수
  data () {
    return {
      seamless: false,

      // update 여부
      updateExist: false,
      fuckYouUpdate: false,

      // Key 입력칸 비밀번호 마스크 여부(true면 *로 감춰지고 false면 문자로 보임)
      twitchIsPwd: true,
      youtubeIsPwd: true,
      additionalIsPwd: true
    }
  },

  // 페이지에서 사용되는 메소드
  /*
   * getSaveKey                     : rtmp.json 파일에서 RTMP URL 및 RTMP KEY 값을 가져옴
   * turnOnSwitch                   : rtmp.json 파일에서 RTMP KEY가 존재하는 입력칸의 토글 스위치만 ON으로 세팅
   * checkTwitckKeyNull             : TWITCH KEY 값이 NULL이 되었는지 확인
   * checkYoutubeKeyNull            : YOUTUBE KEY 값이 NULL이 되었는지 확인
   * checkAddtionalRTMPUrlOrKeyNull : 추가적인 RTMP URL 혹은 KEY 값이 NULL이 되었는지 확인
   * makeNginxConf                  : nginx.conf 파일을 생성함
   * makeRTMPJSON                   : rtmp.json 파일을 생성함
   * nginxSwitch                    : nginx를 ON/OFF 함
   */
  methods: {
    ...mapActions('option', {
      setUpdatePopup: 'updatePopup'
    }),

    ...mapActions('dir', {
      setRecordingDir: 'recordingDir'
    }),

    ...mapActions('keys', {
      setTwitchKey: 'twitchKey',
      setYoutubeKey: 'youtubeKey',
      setAdditionalRTMPUrl: 'additionalRTMPUrl',
      setAdditionalRTMPKey: 'additionalRTMPKey'
    }),

    ...mapActions('nginx', {
      setNginxStatus: 'nginxStatus'
    }),

    ...mapActions('toggleSwitch', {
      setTwitchOn: 'twitchOn',
      setYoutubeOn: 'youtubeOn',
      setAdditionalOn: 'additionalOn',
      setRecordOn: 'recordOn'
    }),

    async updateCheck() {
      let finalUrl
      let thisProgramVersion
      let latestProgramVersion

      const request = https.request({
        host: 'github.com',
        path: '/yjj8353/Multistreaming-Assist/releases/latest'
      }, async response => {
        const re = /[0-9].*\.[0-9].*\.[0-9].*/

        finalUrl = await response.responseUrl.toString()
        latestProgramVersion = re.exec(finalUrl.replace('https://github.com/yjj8353/Multistreaming-Assist/releases/tag/', ''))[0]
        thisProgramVersion = fs.readFileSync(path.join(this.getRootDir, 'version'), 'UTF-8')

        const lpvArray = latestProgramVersion.split('.')
        const tpvArray = thisProgramVersion.split('.')

        if(parseInt(lpvArray[0]) > parseInt(tpvArray[0])) {
          // major version update 있음
          this.updateExist = true
        } else {
          if(parseInt(lpvArray[1]) > parseInt(tpvArray[1])) {
            // minor version update 있음
            this.updateExist = true
          } else {
            if(parseInt(lpvArray[2]) > parseInt(tpvArray[2])) {
              // patch version update 있음
              this.updateExist = true
            } else {
              // version 동일함
              this.updateExist = false
            }
          }
        }
      }).on('error', err => {
        console.log(err)
      })

      request.end()
    },

    updateMessage() {
      if(this.updatePopup === true) return

      // 배포전에 바꿀것
      if(this.updateExist === false) {
        this.seamless = true
      }
    },

    openUpdatePage() {
      shell.openExternal('https://github.com/yjj8353/Multistreaming-Assist/releases/latest')
      this.updatePopup = this.fuckYouUpdate
      this.seamless = false
    },

    closeUpdatePopup() {
      this.updatePopup = this.fuckYouUpdate
      this.seamless = false
    },

    // rtmp.json 파일에서 키 값을 가져와 세팅함
    getSaveKey() {
      const conf = fs.readFileSync(path.join(this.nginxConfDir, 'rtmp.json'), 'utf-8')
      const keys = JSON.parse(conf)

      this.twitchKey = keys.twitch
      this.youtubeKey = keys.youtube
      this.additionalRTMPUrl = keys.rtmpUrl
      this.additionalRTMPKey = keys.rtmpKey

      if(keys.twitchOn === undefined) {
        this.twitchOn = false
      } else {
        this.twitchOn = keys.twitchOn
      }

      if(keys.youtubeOn === undefined) {
        this.youtubeOn = false
      } else {
        this.youtubeOn = keys.youtubeOn  
      }

      if(keys.additionalOn === undefined) {
        this.youtubeOn = false
      } else {
        this.additionalOn = keys.additionalOn
      }

      if(keys.recordingDir === undefined) {
        this.recordingDir = ''
      } else {
        this.recordingDir = keys.recordingDir
      }

      if(keys.recordOn === undefined) {
        this.recordOn = false
      } else {
        this.recordOn = keys.recordOn
      }

      if(keys.updatePopup === undefined) {
        this.updatePopup = false
      } else {
        this.updatePopup = keys.updatePopup
      }
    },

    // rtmp.json 파일에서 키 값이 존재하는 플랫폼만 스위치를 켬
    turnOnSwitch() {
      if(this.twitchKey) {
        this.twitchOn = true
      }

      if(this.youtubeKey) {
        this.youtubeOn = true
      }

      if(this.additionalRTMPUrl && this.additionalRTMPKey) {
        this.additionalOn = true
      }
    },

    // twitchKey q-input 값이 비는 순간 스위치를 끔
    checkTwitchKeykNull(value) {
      if(!value) {
        this.twitchOn = false
      }
    },

    // youtubeKey q-input 값이 비는 순간 스위치를 끔
    checkYoutubeKeyNull(value) {
      if(!value) {
        this.youtubeOn = false
      }
    },

    // additionalRTMP의 url 혹은 key q-input 값이 비는 순간 스위치를 끔
    checkAddtionalRTMPUrlOrKeyNull(value) {
      if(!value) {
        this.additionalOn = false
      }
    },

    // nginx.conf 파일을 생성
    async makeNginxConf() {
      const results = await this.checkKey()

      if(!(results.twitch && results.youtube)) {
        if(!results.twitch) { this.notify('negative', 'TWITCH KEY 값에 문제가 있습니다') }
        if(!results.youtube) { this.notify('negative', 'YOUTUBE KEY 값에 문제가 있습니다') }

        return false
      } else {
        const config = await this.makeNginxConfFile()

        try {
          fs.writeFileSync(path.join(this.nginxConfDir, 'nginx.conf'), config)

          this.notify('positive', 'nginx.conf 파일생성 성공!')

          return true
        } catch(e) {
          this.notify('negative', 'nginx.conf 파일생성에 실패했습니다')

          return false
        }
      }
    },

    // rtmp.json 파일을 생성
    async makeRTMPJSON() {
      const rtmpJSON = await this.makeRTMPJSONFile()
      
      try {
        fs.writeFileSync(path.join(this.nginxConfDir, 'rtmp.json'), rtmpJSON)
        this.notify('positive', 'rtmp.json 파일 생성 성공!')

        return true
      } catch(e) {
        this.notify('negative', 'rtmp.json 파일 생성에 실패했습니다')

        return false
      }
    },

    // nginx.exe를 키거나 끔
    async nginxSwitch() {
      if(this.nginxStatus === false) {
        if(!(await this.makeRTMPJSON())) return
        if(!(await this.makeNginxConf())) return

        const err = this.startNginxProcess(this.nginxDir)

        if(err) {
          this.nginxStatus = false
          this.notify('negative', 'nginx 실행에 실패했습니다')
        }
        
        this.nginxStatus = true
      } else if(this.nginxStatus === true) {
        try {
          this.quitNginxProcess()
        } finally {
          this.nginxStatus = false
        }
      }
    }
  }
}
</script>
