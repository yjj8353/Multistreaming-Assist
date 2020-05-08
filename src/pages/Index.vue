<template>
  <q-page-container>
    <q-page class="q-pa-md" style="background-color: white;">
      <!-- 경로에 한글이 포함되어 있지 않을 경우 실행 -->
      <div v-if="checkIncludeKoreanOnPath()">
        <div class="row">
          <div class="col-11">
            <q-input label="TWITCH RTMP KEY" v-model="twitchKey" :type="twitchIsPwd ? 'password' : 'text'" @input="checTwitchKeykNull">
              <template v-slot:append>
                <q-icon
                  :name="twitchIsPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="twitchIsPwd = !twitchIsPwd"
                />
              </template>
            </q-input>
          </div>
          <div class="col-1" style="display: flex; align-items: center; justify-content: center;">
            <q-toggle v-model="twitchOn" :disable="!twitchKey" size="md" @input="toggleSwitch" />
          </div>
        </div>

        <p></p>

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
          <div class="col-1" style="display: flex; align-items: center; justify-content: center;">
            <q-toggle v-model="youtubeOn" :disable="!youtubeKey" size="md" @input="toggleSwitch" />
          </div>
        </div>

        <p></p>

        <div class="row">
          <div class="q-pr-md col">
            <q-input label="추가적인 RTMP URL" v-model="additionalRTMPUrl" type="text" @input="checkAddtionalRTMPUrlOrKeyNull">
              <template v-slot:append>
              </template>
            </q-input>
          </div>

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
          <div class="col-1" style="display: flex; align-items: center; justify-content: center;">
            <q-toggle v-model="additionalOn" :disable="!additionalRTMPUrl || !additionalRTMPKey" size="md" @input="toggleSwitch" />
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

      <!-- 경로에 한글이 포함되어 있을 경우 실행 -->
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
import { execFile, execFileSync } from 'child_process'
import path from 'path'
import fs from 'fs'

import log from 'electron-log'

import { checkKey, makeNginxConfFile } from '../function/functions'

export default {
  name: 'PageIndex',
  mounted() {
    window.addEventListener('load', () => {
      this.getSaveKey()
      this.turnOnSwitch()
    })
  },
  data () {
    return {
      twitchKey: '',
      youtubeKey: '',
      additionalRTMPUrl: '',
      additionalRTMPKey: '',

      twitchIsPwd: true,
      youtubeIsPwd: true,
      additionalIsPwd: true,

      twitchOn: false,
      youtubeOn: false,
      additionalOn: false,

      toggleSwitchStatus: false
    }
  },
  methods: {
    getSaveKey () {
      log.debug('getSaveKey 함수 진입')
      log.debug('rtmp.json을 분석합니다')

      const conf = fs.readFileSync(path.join(this.$store.state.dir, '\\nginx\\conf\\rtmp.json'), 'utf-8')
      const keys = JSON.parse(conf)

      this.twitchKey = keys.twitch
      this.youtubeKey = keys.youtube
      this.additionalRTMPUrl = keys.rtmpUrl
      this.additionalRTMPKey = keys.rtmpKey
    },

    turnOnSwitch () {
      log.debug('turnOnSwitch 함수 진입')
      if (this.twitchKey) {
        this.twitchOn = true
        log.debug('Twitch Key 값이 존재하므로 ON 합니다')
      }

      if (this.youtubeKey) {
        this.youtubeOn = true
        log.debug('Youtube Key 값이 존재하므로 ON 합니다')
      }

      if (this.additionalRTMPUrl && this.additionalRTMPKey) {
        this.additionalOn = true
        log.debug('추가적인 Key 값이 존재하므로 ON 합니다')
      }
    },

    checTwitchKeykNull (value) {
      if (!value) {
        this.twitchOn = false
      }
    },

    checkYoutubeKeyNull (value) {
      if (!value) {
        this.youtubeOn = false
      }
    },

    checkAddtionalRTMPUrlOrKeyNull (value) {
      if (!value) {
        this.additionalOn = false
      }
    },

    async makeNginxConf () {
      log.debug('makeNginxConf 함수 진입')

      let keys = {
        twitch: this.twitchKey.trim(),
        youtube: this.youtubeKey.trim()
      }

      let results = await checkKey(keys)

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

        const config = makeNginxConfFile(fullTwitch, fullYoutube, fullAdditionalRTMP)

        try {
          fs.writeFileSync(path.join(this.$store.state.dir, '\\nginx\\conf\\nginx.conf'), config)

          this.notify('positive', 'nginx.conf 파일생성 성공!')
          log.debug('nginx.conf 파일 생성 성공')

          return true

        } catch (e) {
          this.notify('negative', 'nginx.conf 파일생성에 실패했습니다')
          log.error('nginx.conf 파일 생성 실패')

          return false
        }
      }
    },

    makeRTMPJson () {
      log.debug('makeRTMPJson 함수 진입')

      const rtmpJSON = '{\n' +
                        '    "twitch":' + '"' + this.twitchKey + '",\n' +
                        '    "youtube":' + '"' + this.youtubeKey + '",\n' +
                        '    "rtmpUrl":' + '"' + this.additionalRTMPUrl + '",\n' +
                        '    "rtmpKey":' + '"' + this.additionalRTMPKey + '"\n' +
                        '}'

      fs.writeFile(path.join(this.$store.state.dir, '\\nginx\\conf\\rtmp.json'), rtmpJSON, (err) => {
        if (err)  {
          this.notify('negative', 'rtmp.json 파일 생성에 실패했습니다')
          log.error('rtmp.json 파일 생성 실패')
        } else {
          this.notify('positive', 'rtmp.json 파일 생성 성공!')
          log.debug('rtmp.json 파일 생성 성공')
        }
      })
    },

    async nginxSwitch () {
      log.debug('nginxSwitch 함수 진입')
      
      if (this.$store.state.nginxStatus === false) {
        if (!(await this.makeNginxConf())) {
          return
        }

        this.makeRTMPJson()

        this.$store.commit('setNginxStatus', true)

        execFile('./nginx.exe', { cwd: path.join(this.$store.state.dir, '\\nginx') }, (err, stdout, stderr) => {
          if (err) {
            this.notify('negative', 'nginx 실행에 실패했습니다')
            this.$store.commit('setNginxStatus', false)
          }
        })

      } else if (this.$store.state.nginxStatus === true) {
        execFileSync('./nginx.exe', ['-s', 'stop'], { cwd: path.join(this.$store.state.dir, '\\nginx') }, (err, stdout, stderr) => {
          if (err) throw err
        })
        this.$store.commit('setNginxStatus', false)
      }
    },

    notify (type, message) {
      log.debug('notify 함수 진입')
      if (type === 'negative') {
        log.error('NOTIFY [ type: ' + type + ' message: ' + message + ' ]')
      }
      if (type === 'positive') {
        log.debug('NOTIFY [ type: ' + type + ' message: ' + message + ' ]')
      }

      this.$q.notify({
        type: type,
        message: message
      })
    },

    checkIncludeKoreanOnPath () {
      log.debug('checkPath 함수 진입')

      const re = new RegExp('[ㄱ-ㅎ|ㅏ-ㅑ|가-힣]')
      return !(re.test(this.$store.state.dir))
    },

    toggleSwitch () {
      if (this.$store.state.nginxStatus) {
        this.toggleSwitchStatus = true
      }
    },

    async nginxReload () {
      await this.makeNginxConf()
      
      execFileSync('./nginx.exe', ['-t'], { cwd: path.join(this.$store.state.dir, '\\nginx') }, (err, stdout, stderr) => {
        if (err) {
          this.notify('negative', 'nginx.conf 파일 테스트에 실패했습니다')
          throw err
        }

        const re = new RegExp('nginx.conf syntax is ok')
        console.log(re.test(stdout))
        if (re.test(stdout)) {
          console.log('테스트 통과')
          execFileSync('./nginx.exe', ['-s', 'stop'], { cwd: path.join(this.$store.state.dir, '\\nginx') }, (err, stdout, stderr) => {
            if (err) {
              this.notify('negative', 'nginx 중지하지 못했습니다')
              throw err
            } else {
              this.notify('positive', 'nginx 중지 완료')
            }
          })

          execFile('./nginx.exe', { cwd: path.join(this.$store.state.dir, '\\nginx') }, (err, stdout, stderr) => {
            if (err) {
              this.notify('negative', 'nginx 실행에 실패했습니다')
              this.$store.commit('setNginxStatus', false)
            }
          })
        } else {
          this.notify('negative', 'nginx.conf 파일에 문제가 있는 것 같습니다')
        }
      })
      
      this.toggleSwitchStatus = false
    }
  }
}
</script>
