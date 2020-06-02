<template>
  <q-page-container>
    <q-page class="q-pa-md" style="background-color: white;">
      <!-- 경로에 한글이 포함되어 있지 않을 경우 -->
      <div v-if="checkIncludeKoreanOnPath()">

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
            <q-toggle v-model="twitchOn" :disable="!twitchKey" size="md" @input="toggleSwitchIsToggle" />
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
            <q-toggle v-model="youtubeOn" :disable="!youtubeKey" size="md" @input="toggleSwitchIsToggle" />
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
            <q-toggle v-model="additionalOn" :disable="!additionalRTMPUrl || !additionalRTMPKey" size="md" @input="toggleSwitchIsToggle" />
          </div>
        </div>

        <p></p>

        <div class="row">
          <div v-show="toggleSwitchStatus && $store.state.nginxStatus" class="q-pr-md col">
            <q-btn size="lg" color="grey" label="Nginx 재시작" @click="nginxReload" />
          </div>
          <div class="q-pl-md col">
            <q-btn size="lg" class="float-right" :color="$store.state.nginxStatus ? 'red' : 'primary'" :label="$store.state.nginxStatus ? 'Nginx 종료' : 'Nginx 시작'" @click="nginxSwitch" />
          </div>
        </div>
      </div>

      <!-- 경로에 한글이 포함되어 있을 경우 -->
      <div v-else>
        <q-card class="my-card">
          <q-card-section>
            <span>경로에 한글이 포함되어 있는 것 같습니다</span><br />
            <span>한글이 포함되어 있으면 Nginx가 실행되지 않습니다</span>
          </q-card-section>
        </q-card>
      </div>

    </q-page>
  </q-page-container>
</template>

<script>
import fs from 'fs'
import path from 'path'

// nginx 실행 관련
import { startNginxProcess } from '../function/nginx'
import { quitNginxProcess }  from '../function/nginx'
import { findNginxProcess }  from '../function/nginx'
import { testNginxProcess }  from '../function/nginx'

// functions 관련
import { checkKey }          from '../function/functions'
import { makeRTMPJSONFile }  from '../function/functions'
import { makeNginxConfFile } from '../function/functions'

export default {
  name: 'PageIndex',
  
  // 페이지가 마운트시 실행되는 메소드
  mounted() {
    window.addEventListener('load', () => {
      this.getSaveKey()
      this.turnOnSwitch()
    })
  },

  // 페이지에서 사용되는 데이터 변수
  data () {
    return {

      // q-input에 들어가는 키 값들
      twitchKey: '',
      youtubeKey: '',
      additionalRTMPUrl: '',
      additionalRTMPKey: '',

      // Key 입력칸 비밀번호 마스크 여부(true면 *로 감춰지고 false면 문자로 보임)
      twitchIsPwd: true,
      youtubeIsPwd: true,
      additionalIsPwd: true,

      // Key 입력칸 우측 토글 스위치 On/Off 여부
      twitchOn: false,
      youtubeOn: false,
      additionalOn: false,

      // nginx.exe가 실행된 이후로 토글 스위치 값이 변경되었는지 확인 용도
      toggleSwitchStatus: false
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
   * notify                         : 사용자에게 알림 메시지를 표시함
   * checkIncludeKoreanOnPath       : 프로그램 경로에 한글이 존재하는지 확인
   * toggleSwitchIsToggle           : nginx가 실행된 상태에서 토글 스위치의 상태가 변경되었는지 확인
   * nginxIsWorking                 : nginx가 실행중인지 확인함
   * nginxReload                    : nginx를 재시작함
   * 
   */
  methods: {

    // rtmp.json 파일에서 키 값을 가져와 세팅함
    getSaveKey () {
      const conf = fs.readFileSync(path.join(this.$store.state.dir, '\\nginx\\conf\\rtmp.json'), 'utf-8')
      const keys = JSON.parse(conf)

      this.twitchKey = keys.twitch
      this.youtubeKey = keys.youtube
      this.additionalRTMPUrl = keys.rtmpUrl
      this.additionalRTMPKey = keys.rtmpKey
    },

    // rtmp.json 파일에서 키 값이 존재하는 플랫폼만 스위치를 켬
    turnOnSwitch () {
      if (this.twitchKey) {
        this.twitchOn = true
      }

      if (this.youtubeKey) {
        this.youtubeOn = true
      }

      if (this.additionalRTMPUrl && this.additionalRTMPKey) {
        this.additionalOn = true
      }
    },

    // twitchKey q-input 값이 비는 순간 스위치를 끔
    checkTwitchKeykNull (value) {
      if (!value) {
        this.twitchOn = false
      }
    },

    // youtubeKey q-input 값이 비는 순간 스위치를 끔
    checkYoutubeKeyNull (value) {
      if (!value) {
        this.youtubeOn = false
      }
    },

    // additionalRTMP의 url 혹은 key q-input 값이 비는 순간 스위치를 끔
    checkAddtionalRTMPUrlOrKeyNull (value) {
      if (!value) {
        this.additionalOn = false
      }
    },

    // nginx.conf 파일을 생성
    async makeNginxConf () {
      let keys = {
        twitch: this.twitchKey.trim(),
        youtube: this.youtubeKey.trim()
      }

      const results = await checkKey(keys)

      if (!(results.twitch && results.youtube)) {
        if (!results.twitch) { this.notify('negative', 'TWITCH KEY 값에 문제가 있습니다') }
        if (!results.youtube) { this.notify('negative', 'YOUTUBE KEY 값에 문제가 있습니다') }

        return false

      } else {
        let fullTwitch = this.twitchKey.trim() ? 'push rtmp://live-sel.twitch.tv/app/' + this.twitchKey.trim() + ';' : ''
        let fullYoutube = this.youtubeKey.trim() ? 'push rtmp://a.rtmp.youtube.com/live2/' + this.youtubeKey.trim() + ';' : ''
        let fullAdditionalRTMP = 'push ' + this.additionalRTMPUrl.trim() + '/' + this.additionalRTMPKey.trim() + ';'
        
        if (fullAdditionalRTMP === 'push /;') {
          fullAdditionalRTMP = ''
        }

        fullTwitch = this.twitchOn ? fullTwitch : ''
        fullYoutube = this.youtubeOn ? fullYoutube : ''
        fullAdditionalRTMP = this.additionalOn ? fullAdditionalRTMP : ''

        const config = await makeNginxConfFile(fullTwitch, fullYoutube, fullAdditionalRTMP)

        try {
          fs.writeFileSync(path.join(this.$store.state.dir, '\\nginx\\conf\\nginx.conf'), config)

          this.notify('positive', 'nginx.conf 파일생성 성공!')

          return true

        } catch (e) {
          this.notify('negative', 'nginx.conf 파일생성에 실패했습니다')

          return false
        }
      }
    },

    // rtmp.json 파일을 생성
    async makeRTMPJSON () {
      const rtmpJSON = await makeRTMPJSONFile(this.twitchKey, this.youtubeKey, this.additionalRTMPUrl, this.additionalRTMPKey)

      fs.writeFile(path.join(this.$store.state.dir, '\\nginx\\conf\\rtmp.json'), rtmpJSON, (err) => {
        if (err)  {
          this.notify('negative', 'rtmp.json 파일 생성에 실패했습니다')
        } else {
          this.notify('positive', 'rtmp.json 파일 생성 성공!')
        }
      })
    },

    // nginx.exe를 키거나 끔
    async nginxSwitch () {
      if (this.$store.state.nginxStatus === false) {
        if (!(await this.makeNginxConf())) return

        await this.makeRTMPJSON()

        this.$store.commit('setNginxStatus', true)

        const err = startNginxProcess(path.join(this.$store.state.dir, '\\nginx'))
        if (err) {
          this.$store.commit('setNginxStatus', false)
          this.notify('negative', 'nginx 실행에 실패했습니다')
        }

      } else if (this.$store.state.nginxStatus === true) {
        const result = quitNginxProcess(path.join(this.$store.state.dir, '\\nginx'))
        this.$store.commit('setNginxStatus', false)
      }
    },

    // 사용자에게 알림 메시지를 보여줌
    notify (type, message) {
      this.$q.notify({
        type: type,
        message: message
      })
    },

    // 프로그램 경로에 한글이 존재하는지 확인
    checkIncludeKoreanOnPath () {
      const re = new RegExp('[ㄱ-ㅎ|ㅏ-ㅑ|가-힣]')
      return !(re.test(this.$store.state.dir))
    },

    // nginx.exe가 겨진 상태에서, Key 적용여부 토글 스위치 상태가 변했는지 체크함
    toggleSwitchIsToggle () {
      if (this.$store.state.nginxStatus) {
        this.toggleSwitchStatus = true
      }
    },

    nginxIsWorking () {
      const result = findNginxProcess()

      //if ()
    },

    // nginx.exe를 재시작함 (현재 완성되지 않음)
    nginxReload () {

      // result[0]: stdout, result[1]: stderr
      const result = testNginxProcess(path.join(this.$store.state.dir, '\\nginx'))
      const re = new RegExp('syntax is ok');

      // nginx.exe -t 결과는 항상 stderr로만 리턴하니 주의
      if (re.test(result[1])) {
        
        // nginx 종료 후, 1초동안 대기 한 뒤 nginx를 새로 시작함
        setTimeout(function () {
          this.nginxSwitch()
        }.bind(this), 1000)
        this.nginxSwitch()
      }

      this.toggleSwitchStatus = false
    }
  }
}
</script>
