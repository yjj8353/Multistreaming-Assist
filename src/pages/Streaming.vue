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
import fs from 'fs'
import path from 'path'

import { CheckMixin } from 'src/mixins/CheckMixin'
import { ConfigMixin } from 'src/mixins/ConfigMixin'
import { NginxMixin } from 'src/mixins/NiginxMixin'
import { QuasarMixin } from 'src/mixins/QuasarMixin'

import { mixins } from 'vue-class-component'
import { Component } from 'vue-property-decorator'

@Component
export default class StreamingPage extends mixins(CheckMixin, ConfigMixin, NginxMixin, QuasarMixin) {
  twitchIsPwd = true
  youtubeIsPwd = true
  additionalIsPwd = true

  nginxSwitch() {
    const allToggleSwitchOff = this.checkAllToggleSwitchOff(this.twitchOn, this.youtubeOn, this.additionalOn)

    if(allToggleSwitchOff) {
      this.notify('negative', '최소한 하나 이상의 플랫폼이 활성화돼야 합니다')
      return
    }

    if(!this.nginxStatus) {
      const keyData = this.makeKeyJSONString()
      const nginxConfig = this.makeNginxConfString()

      fs.writeFileSync(path.join(this.nginxConfDir, 'rtmp.json'), keyData)
      fs.writeFileSync(path.join(this.nginxConfDir, 'nginx.conf'), nginxConfig)
      
      this.nginxStatus = true

      this.startNginxProcess()
    } else {
      try {
        this.quitNginxProcess()
      } finally {
        this.nginxStatus = false
      }
    }
  }
}
</script>
