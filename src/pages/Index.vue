<template>
  <q-page-container>
    <q-page class="q-pa-md" style="background-color: white;">
      <!-- 경로에 한글이 포함되어 있지 않을 경우 실행 -->
      <div v-if="checkPath()">
        <div class="row">
          <div class="col">
            <q-input label="TWITCH RTMP KEY" v-model="twitchKey" :type="twitchIsPwd ? 'password' : 'text'">
              <template v-slot:append>
                <q-icon
                  :name="twitchIsPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="twitchIsPwd = !twitchIsPwd"
                />
              </template>
            </q-input>
          </div>
        </div>

        <p></p>

        <div class="row">
          <div class="col">
            <q-input label="YOUTUBE RTMP KEY" v-model="youtubeKey" :type="youtubeIsPwd ? 'password' : 'text'">
              <template v-slot:append>
                <q-icon
                  :name="youtubeIsPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="youtubeIsPwd = !youtubeIsPwd"
                />
              </template>
            </q-input>
          </div>
        </div>

        <p></p>

        <div class="row">
          <div class="q-pr-md col">
            <q-input label="추가적인 RTMP URL" v-model="additionalRTMPUrl" type="text">
              <template v-slot:append>
              </template>
            </q-input>
          </div>

          <div class="q-pl-md col">
            <q-input label="추가적인 RTMP KEY" v-model="additionalRTMPKey" :type="youtubeIsPwd ? 'password' : 'text'">
              <template v-slot:append>
                <q-icon
                  :name="additionalIsPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="additionalIsPwd = !additionalIsPwd"
                />
              </template>
            </q-input>
          </div>
        </div>

        <p></p>

        <div class="row">
          <div class="q-pr-md col">
            <q-btn size="lg" color="grey" label="nginx.conf 생성" @click="makeNginxConf"/>
          </div>
          <div class="q-pl-md col">
            <q-btn size="lg" class="float-right" :color="$store.state.nginxStatus ? 'red' : 'primary'" :label="$store.state.nginxStatus ? 'nginx 종료' : 'nginx 시작'" @click="nginxSwitch" />
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

import { checkKey, makeNginxConfFile } from '../function/functions'

export default {
  name: 'PageIndex',
  mounted() {
    window.addEventListener('load', () => {
      this.getSaveKey()
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
      additionalIsPwd: true
    }
  },
  methods: {
    getSaveKey () {
      const conf = fs.readFileSync(path.join(this.$store.state.dir, '\\nginx\\conf\\rtmp.json'), 'utf-8')
      const keys = JSON.parse(conf)

      this.twitchKey = keys.twitch
      this.youtubeKey = keys.youtube
      this.additionalRTMPUrl = keys.rtmpUrl
      this.additionalRTMPKey = keys.rtmpKey
    },

    async makeNginxConf () {
      let keys = {
        twitch: this.twitchKey.trim(),
        youtube: this.youtubeKey.trim()
      }

      let results = await checkKey(keys)

      if (!(results.twitch && results.youtube)) {
        if (!results.twitch) { this.notify('negative', 'TWITCH KEY 값에 문제가 있습니다') }
        if (!results.youtube) { this.notify('negative', 'YOUTUBE KEY 값에 문제가 있습니다') }
      } else {
        this.makeRTMPJson()

        const fullTwitch = this.twitchKey.trim() ? 'push rtmp://live-sel.twitch.tv/app/' + this.twitchKey.trim() + ';' : ''
        const fullYoutube = this.youtubeKey.trim() ? 'push rtmp://a.rtmp.youtube.com/live2/' + this.youtubeKey.trim() + ';' : ''
        let   fullAdditionalRTMP = 'push ' + this.additionalRTMPUrl.trim() + '/' + this.additionalRTMPKey.trim() + ';'
        
        if (fullAdditionalRTMP === 'push /;') {
          fullAdditionalRTMP = ''
        }

        const config = makeNginxConfFile(fullTwitch, fullYoutube, fullAdditionalRTMP)

        fs.writeFile(path.join(this.$store.state.dir, '\\nginx\\conf\\nginx.conf'), config, (err) => {
          if (err) {
            this.notify('negative', 'nginx.conf 파일생성에 실패했습니다')
          } else {
            this.notify('positive', 'nginx.conf 파일생성 성공!')
          }
        })
      }
    },

    makeRTMPJson () {
      const rtmpJSON = '{\n' +
                        '    "twitch":' + '"' + this.twitchKey + '",\n' +
                        '    "youtube":' + '"' + this.youtubeKey + '",\n' +
                        '    "rtmpUrl":' + '"' + this.additionalRTMPUrl + '",\n' +
                        '    "rtmpKey":' + '"' + this.additionalRTMPKey + '"\n' +
                        '}'

      fs.writeFile(path.join(this.$store.state.dir, '\\nginx\\conf\\rtmp.json'), rtmpJSON, (err) => {
        if (err)  {
          this.notify('negative', 'rtmp.json 파일 생성에 실패했습니다')
        } else {
          this.notify('positive', 'rtmp.json 파일 생성 성공!')
        }
      })
    },

    nginxSwitch () {
      if (this.$store.state.nginxStatus === false) {
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
      this.$q.notify({
        type: type,
        message: message
      })
    },

    checkPath () {
      const re = new RegExp('[ㄱ-ㅎ|ㅏ-ㅑ|가-힣]')
      return !(re.test(this.$store.state.dir))
    }
  }
}
</script>
