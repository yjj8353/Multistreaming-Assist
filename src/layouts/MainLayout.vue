<template>
  <q-layout class="shadow-2 rounded-borders">
    
    <!-- 경로에 한글이 포함되어 있지 않을 경우 -->
    <div v-if="checkPath()">
      <q-header elevated>
        
        <!-- 상단 바 -->
        <q-bar class="q-electron-drag">
          <q-icon :name="nginxStatus ? 'wifi' : 'wifi_off'" />
          <div>Multistreaming-Assist</div>

          <q-space />

          <!-- 최소화, 최대화, 닫기 버튼 -->
          <q-btn dense flat icon="minimize" @click="minimize" />
          <q-btn dense flat :icon="isMaximized ? 'filter_none' : 'crop_square'" @click="maximize" />
          <q-btn dense flat icon="close" @click="closeApp" />
        </q-bar>

        <!-- Tool Bar -->
        <div class="q-pa-xs q-pl-md row items-center bg-blue-8">

          <!-- 도구 -->
          <div class="cursor-pointer non-selectable">
            도구
            <q-menu>
              <q-list v-if="nginxStatus" dense style="min-width: 100px">
                <q-item clickable v-close-popup>
                  <q-item-section @click="nginxIsWorking">NGINX 프로세스 확인</q-item-section>
                </q-item>
              </q-list>
              <q-list v-else dense style="min-width: 100px">
                <q-item disable v-close-popup>
                  <q-item-section>NGINX 프로세스 확인</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </div>

          <!-- 도움말 -->
          <div class="q-ml-md cursor-pointer non-selectable">
            도움말
            <q-menu>
              <q-list dense style="min-width: 100px">
                <q-item clickable v-close-popup>
                  <q-item-section @click="how2Use">사용법</q-item-section>
                </q-item>

                <q-separator />

                <q-item clickable v-close-popup>
                  <q-item-section @click="contributors">도움을 주신분들</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </div>

        </div>

        <!-- 스트리밍/녹화 선택 -->
        <div class="bg-blue-6">
          <q-tabs>
            <q-route-tab
              label="스트리밍"
              to="/"
              exact
            />
            <q-route-tab
              label="녹화"
              to="/recording"
              exact
            />
          </q-tabs>
        </div>
      </q-header>

      <q-page-container>
        <router-view />
      </q-page-container>

      <!-- 업데이트가 존재하고, 팝업금지가 체크되어 있지 않을 때 표시함 -->
      <div v-if="updateExist && !dontPopupUpdateMessage">
        <UpdateComponent />
      </div>

    </div>

    <!-- 경로에 한글이 포함되어 있을 경우 -->
    <div v-else>
      <ErrorNginxPath />
    </div>

  </q-layout>
</template>

<script lang="ts">
// electron
import { shell } from 'electron'

// vue
import Component, { mixins } from 'vue-class-component'

// components
import UpdateComponent from 'src/components/UpdateComponent.vue'
import ErrorNginxPath from 'src/components/ErrorNginxPath.vue'

// mixins
import { CheckMixin } from 'src/mixins/CheckMixin'
import { NginxMixin } from 'src/mixins/NiginxMixin'
import { StoreMixin } from 'src/mixins/StoreMixin'

import fs from 'fs'
import path from 'path'

import { Keys } from 'src/object/keys'
import { Options } from 'src/object/options'
import { LegacyRTMP } from 'src/object/legacyRTMP'
import { BroadcastOption } from 'src/object/broadcastOption'

import https from 'follow-redirects/https'

@Component({
  components: { UpdateComponent, ErrorNginxPath }
})
export default class MainLayout extends mixins(CheckMixin, NginxMixin, StoreMixin) {
  get win(): Electron.BrowserWindow | null { return this.$q.electron.remote.BrowserWindow.getFocusedWindow() }

  isMaximized = false
  updateExist = false
  keys: Keys | null = null
  options: Options | null = null

  mounted() {
    this.updateCheck()
    this.dirsSetting()
    this.eventsSetting()
    this.parsingBroadcastOptionJson()
    this.setKeyValues()
    this.setOptionValues()
  }

  updateCheck() {
    let finalUrl: string
    let thisProgramVersion: string
    let latestProgramVersion: string

    const request = https.request({
      host: 'github.com',
      path: '/yjj8353/Multistreaming-Assist/releases/latest'
    }, response => {
      finalUrl = response.responseUrl
      latestProgramVersion = finalUrl.replace('https://github.com/yjj8353/Multistreaming-Assist/releases/tag/v', '')
      thisProgramVersion = fs.readFileSync(path.join(this.getRootDir, 'version'), 'UTF-8')
      
      const lpvArray = latestProgramVersion.split('.')
      const tpvArray = thisProgramVersion.split('.')
      
      const lpvMajor = lpvArray[0]
      const lpvMinor = lpvArray[1]
      const lpvPatch = lpvArray[2].split('-')[0]
      const lpvPreRelease = lpvArray[2].split('-')[1] ? this.preReleaseNumbering(lpvArray[2].split('-')[1]) : this.preReleaseNumbering('')
      const tpvMajor = tpvArray[0]
      const tpvMinor = tpvArray[1]
      const tpvPatch = tpvArray[2].split('-')[0]
      const tpvPrerelease = tpvArray[2].split('-')[1] ? this.preReleaseNumbering(tpvArray[2].split('-')[1]) : this.preReleaseNumbering('')

      if(parseInt(lpvMajor) > parseInt(tpvMajor)) {
        // major version update 있음
        this.updateExist = true
      } else {
        if(parseInt(lpvMinor) > parseInt(tpvMinor)) {
          // minor version update 있음
          this.updateExist = true
        } else {
          if(parseInt(lpvPatch) > parseInt(tpvPatch)) {
            // patch version update 있음
            this.updateExist = true
          } else {
            if(lpvPreRelease > tpvPrerelease) {
              // pre release version update 있음
              this.updateExist = true
            } else {
              // version 동일함
              this.updateExist = false
            }
          }
        }
      }
    }).on('error', err => {
      console.log(err)
    })
    
    request.end()
  }

  preReleaseNumbering(preRelease: string): number {
    // pre release는 Alpha -> Beta -> RC -> RTM 순으로 버전이 높다
    const Alpha = 0
    const Beta = 1
    const RC = 2
    const RTM = 3

    switch(preRelease) {
      case 'alpha':
        return Alpha
      case 'beta':
        return Beta
      case 'rc':
        return RC
      default:
        return RTM
    }
  }

  dirsSetting() {
    this.rootDir = this.dir
    this.nginxDir = this.rootDir
    this.nginxConfDir = this.nginxDir
    this.nginxLogsDir = this.nginxDir
  }

  eventsSetting() {
    const windowResizeEvent = () => {
      if(this.win !== null && this.win.isMaximized()) {
        this.isMaximized = true
      } else {
        this.isMaximized = false
      }
    }

    window.addEventListener('resize', windowResizeEvent)
  }

  parsingBroadcastOptionJson() {
    // Legacy 프로그램에 존재하는 rtmp.json 파일이 존재할때 타는 로직
    if(fs.existsSync(path.join(this.nginxConfDir, 'rtmp.json'))) {
      const jsonFile: string = fs.readFileSync(path.join(this.nginxConfDir, 'rtmp.json'), 'utf-8')
      const legacyRTMP: LegacyRTMP = JSON.parse(jsonFile) as LegacyRTMP

      const {
        // keys
        twitch,
        youtube,
        rtmpUrl,
        rtmpKey,

        // options
        twitchOn,
        youtubeOn,
        additionalOn,
        recordingDir,
        recordOn,
        updatePopup
      } = legacyRTMP

      this.keys = {
        twitch,
        youtube,
        rtmpUrl,
        rtmpKey
      }

      // 기존 rtmp.json과 broadcastOptions.json의 recordOn, recodingDir 순서에 유의
      this.options = {
        twitchOn,
        youtubeOn,
        additionalOn,
        recordOn,
        recordingDir,
        "dontPopupUpdateMessage": updatePopup
      }

    } else {
      const jsonFile: string = fs.readFileSync(path.join(this.nginxConfDir, 'broadcastOption.json'), 'utf-8')
      const broadcastOption: BroadcastOption = JSON.parse(jsonFile) as BroadcastOption
  
      this.keys = broadcastOption.keys
      this.options = broadcastOption.options
    }
  }

  setKeyValues() {
    if(this.keys) {
      this.twitchKey = this.keys.twitch
      this.youtubeKey = this.keys.youtube
      this.additionalRTMPUrl = this.keys.rtmpUrl
      this.additionalRTMPKey = this.keys.rtmpKey
    }
  }

  setOptionValues() {
    if(this.options) {
      this.twitchOn = this.options.twitchOn
      this.youtubeOn = this.options.youtubeOn
      this.additionalOn = this.options.additionalOn
      this.recordOn = this.options.recordOn

      this.recordingDir = this.options.recordingDir

      this.dontPopupUpdateMessage = this.options.dontPopupUpdateMessage
    }
  }

  minimize() {
    if(this.win !== null && process.env.MOD === 'electron') {
      this.win.minimize()
    }
  }

  maximize() {
    if(this.win !== null && process.env.MOD === 'electron') {
      if(this.win.isMaximized()) {
        this.win.unmaximize()
        this.isMaximized = false
      } else {
        this.win.maximize()
        this.isMaximized = true
      }
    }
  }

  closeApp() {
    if(this.win !== null) {
      this.win.close()
    }
  }

  async how2Use() {
    await shell.openExternal('https://github.com/yjj8353/Multistreaming-Assist/blob/master/README.md')
  }

  async contributors() {
    await shell.openExternal('https://github.com/yjj8353/Multistreaming-Assist/blob/master/%EA%B8%B0%EC%97%AC%EC%9E%90%EB%AA%A9%EB%A1%9D.md')
  }

  nginxIsWorking() {
    const result = this.findNginxProcess()
    return result
  }

  checkPath() {
    return this.checkIncludeKoreanOnPath(this.dir)
  }
}
</script>
