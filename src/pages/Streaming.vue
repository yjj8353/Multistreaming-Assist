<template>
  <q-page class="q-pa-md" style="background-color: white;">

    <!-- TWITCH RTMP KEY 입력 칸 -->
    <div class="row">
      <div class="col-11">
        <q-input label="TWITCH RTMP KEY" v-model="twitchKey" :type="twitchIsPwd ? 'password' : 'text'" @input="checkTwitchKeyNull">
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

  </q-page>
</template>

<script lang="ts">
import { ConfigMixin } from 'src/mixins/ConfigMixin'
import { NginxMixin } from 'src/mixins/NiginxMixin'
import { QuasarMixin } from 'src/mixins/QuasarMixin'
import { mixins } from 'vue-class-component'
import { Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const dirStore = namespace('dir')
const keyStore = namespace('keys')
const nginxStroe = namespace('nginx')
const toggleSwitchStore = namespace('toggleSwitch')

@Component
export default class StreamingPage extends mixins(ConfigMixin, NginxMixin, QuasarMixin) {
  @dirStore.Getter('nginxDir') getNginxDir!: string
  @dirStore.Getter('nginxLogsDir') getNginxLogsDir!: string

  @keyStore.Getter('twitchKey') getTwitchKey!: string
  @keyStore.Getter('youtubeKey') getYoutubeKey!: string
  @keyStore.Getter('additionalRTMPUrl') getAdditionalRTMPUrl!: string
  @keyStore.Getter('additionalRTMPKey') getAdditionalRTMPKey!: string
  @keyStore.Action('twitchKey') setTwitchKey!: (value: string) => void
  @keyStore.Action('youtubeKey') setYoutubeKey!: (value: string) => void
  @keyStore.Action('additionalRTMPUrl') setAdditionalRTMPUrl!: (value: string) => void
  @keyStore.Action('additionalRTMPKey') setAdditionalRTMPKey!: (value: string) => void

  @nginxStroe.Getter('nginxStatus') getNginxStatus!: boolean
  @nginxStroe.Action('nginxStatus') setNginxStatus!: (value: boolean) => void

  @toggleSwitchStore.Getter('twitchOn') getTwitchOn!: boolean
  @toggleSwitchStore.Getter('youtubeOn') getYoutubeOn!: boolean
  @toggleSwitchStore.Getter('additionalOn') getAdditionalOn!: boolean
  @toggleSwitchStore.Action('twitchOn') setTwitchOn!: (value: boolean) => void
  @toggleSwitchStore.Action('youtubeOn') setYoutubeOn!: (value: boolean) => void
  @toggleSwitchStore.Action('additionalOn') setAdditionalOn!: (value: boolean) => void

  get nginxDir(): string { return this.getNginxDir }
  get nginxLogsDir(): string { return this.getNginxLogsDir }

  get twitchKey(): string { return this.getTwitchKey }
  set twitchKey(value: string) { this.setTwitchKey(value) }
  get youtubeKey(): string { return this.getYoutubeKey }
  set youtubeKey(value: string) { this.setYoutubeKey(value) }
  get additionalRTMPUrl(): string { return this.getAdditionalRTMPUrl }
  set additionalRTMPUrl(value: string) { this.setAdditionalRTMPUrl(value) }
  get additionalRTMPKey(): string { return this.getAdditionalRTMPKey }
  set additionalRTMPKey(value: string) { this.setAdditionalRTMPKey(value) }

  get nginxStatus(): boolean { return this.getNginxStatus }
  set nginxStatus(value: boolean) { this.setNginxStatus(value) }

  get twitchOn(): boolean { return this.getTwitchOn }
  set twitchOn(value: boolean) { this.setTwitchOn(value) }
  get youtubeOn(): boolean { return this.getYoutubeOn }
  set youtubeOn(value: boolean) { this.setYoutubeOn(value) }
  get additionalOn(): boolean { return this.getAdditionalOn }
  set additionalOn(value: boolean) { this.setAdditionalOn(value) }

  twitchIsPwd = true
  youtubeIsPwd = true
  additionalIsPwd = true

  nginxSwitch() {
    if(!this.nginxStatus) {
      const keyData = this.makeKeyJSONString()
      const nginxConfig = this.makeNginxConfString()

      if(!keyData) { return }
      if(!nginxConfig) { return }
      
      const err = this.startNginxProcess(this.nginxDir, this.nginxLogsDir)

      if(err) {
        this.nginxStatus = false
        this.notify('negative', 'nginx 실행에 실패했습니다')
      }

      this.nginxStatus = true
    } else {
      try {
        this.quitNginxProcess()
      } finally {
        this.nginxStatus = false
      }
    }
  }

  // twitchKey q-input 값이 비는 순간 스위치를 끔
  checkTwitchKeyNull(value: string) {
    if(!value) {
      this.twitchOn = false
    }
  }

  // youtubeKey q-input 값이 비는 순간 스위치를 끔
  checkYoutubeKeyNull(value: string) {
    if(!value) {
      this.youtubeOn = false
    }
  }

  // additionalRTMP의 url 혹은 key q-input 값이 비는 순간 스위치를 끔
  checkAddtionalRTMPUrlOrKeyNull(value: string) {
    if(!value) {
      this.additionalOn = false
    }
  }
}
</script>
