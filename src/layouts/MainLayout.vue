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

      <!-- NGINX 실행 확인 후, 꺼져있을 경우 뜨는 alert 창 -->
      <div v-if="!nginxIsNotWorking">
        <NginxStatusCheckComponent />
      </div>

      <div v-if="checkBeforeCloseThisApp">
        <CheckBeforeCloseAppComponent />
      </div>

    </div>
    <!-- 경로에 한글이 포함되어 있을 경우 -->
    <div v-else>
      <ErrorNginxPath />
    </div>
  </q-layout>
</template>

<script lang="ts">

// node.js 기본 기능
import fs from 'fs'
import path from 'path'

// electron
import { shell } from 'electron'

// vue
import Component, { mixins } from 'vue-class-component'

// components
import UpdateComponent from 'src/components/UpdateComponent.vue'
import ErrorNginxPath from 'src/components/ErrorNginxPath.vue'
import NginxStatusCheckComponent from 'src/components/NginxStatusCheckComponent.vue'
import CheckBeforeCloseAppComponent from 'src/components/CheckBeforeColoseAppComponent.vue'

// mixins
import { CheckMixin } from 'src/mixins/CheckMixin'
import { NginxMixin } from 'src/mixins/NiginxMixin'
import { StoreMixin } from 'src/mixins/StoreMixin'
import { ConfigMixin } from 'src/mixins/ConfigMixin'

// store
import { Keys } from 'src/object/keys'
import { Options } from 'src/object/options'
import { LegacyRTMP } from 'src/object/legacyRTMP'
import { BroadcastOption } from 'src/object/broadcastOption'

//https
import https from 'follow-redirects/https'

@Component({
  // template 부분에서 사용될 컴포넌트들
  components: {
    ErrorNginxPath,
    UpdateComponent,
    NginxStatusCheckComponent,
    CheckBeforeCloseAppComponent
  }
})

/************************************************************************************************************
 *  변수
 *  변수명            자료형         용도
 ************************************************************************************************************
 *  isMaximized     boolean     어플리케이션 화면 최대화 여부를 확인하는 변수
 *  updateExist     boolean     업데이트가 있는지 확인하는 변수
 *  keys            object      rtmp key 값을 담는 JSON object 객체
 *  options         object      nginx option 값을 담는 JSON object 객체
 ************************************************************************************************************
 *  함수
 *  함수명                          매개변수(자료형)           반환자료형     용도
 ************************************************************************************************************
 *  checkIsMaximized              없음                    없음          프로그램 시작 시, 창이 최대화 된 상태인지 확인함
 *  updateCheck                   없음                    없음          프로그램 시작 시, 업데이트가 있는지 확인함
 *  preReleaseNumbering           preRelease(string)     number       pre-release의 enum을 반환함
 *  dirsSetting                   없음                    없음          
 *  parsingBroadcastOptionJson    없음                    없음
 *  setKeyValues                  없음                    없음
 *  setOptionValues               없음                    없음
 *  minimize                      없음                    없음
 *  maximize                      없음                    없음
 *  closeApp                      없음                    없음
 *  how2Use                       없음                    없음
 *  contributors                  없음                    없음
 *  nginxIsWorking                없음                    없음
 *  checkPath                     없음                    없음
 ************************************************************************************************************/
export default class MainLayout extends mixins(CheckMixin, ConfigMixin, NginxMixin, StoreMixin) {
  isMaximized = false
  updateExist = false
  keys: Keys | null = null
  options: Options | null = null

  mounted() {
    this.checkIsMaximized()
    this.updateCheck()
    this.dirsSetting()
    this.parsingBroadcastOptionJson()
    this.setKeyValues()
    this.setOptionValues()
  }

  checkIsMaximized() {
    if(this.win !== null && process.env.MODE === 'electron') {
      this.isMaximized = this.win.isMaximized()
    }
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
    const pr = {
      Alpha: 0,
      Beta: 1,
      RC: 2,
      RTM: 3
    }

    // pre release는 Alpha -> Beta -> RC -> RTM 순으로 버전이 높다
    switch(preRelease) {
      case 'alpha':
        return pr.Alpha
      case 'beta':
        return pr.Beta
      case 'rc':
        return pr.RC
      default:
        return pr.RTM
    }
  }

  dirsSetting() {
    this.rootDir = this.dir
    this.nginxDir = this.rootDir
    this.nginxConfDir = this.nginxDir
    this.nginxLogsDir = this.nginxDir
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
        dontPopupUpdateMessage: updatePopup
      }

      const broadcastOption = this.makeBroadcastOptionJsonString()
      
      try {
        fs.writeFileSync(path.join(this.nginxConfDir, 'broadcastOption.json'), broadcastOption)
        fs.unlink(path.join(this.nginxConfDir, 'rtmp.json'), (err) => {
          console.error(err)
        })
      } catch(e) {
        console.error(e)
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
    if(this.win !== null && process.env.MODE === 'electron') {
      this.win.minimize()
    }
  }

  maximize() {
    if(this.win !== null && process.env.MODE === 'electron') {
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
    if(this.nginxStatus) {
      this.checkBeforeCloseThisApp = true
    } else {
      if(this.win !== null) {
        this.win.close()
      }
    }
  }

  async how2Use() {
    await shell.openExternal('https://github.com/yjj8353/Multistreaming-Assist/blob/master/README.md')
  }

  async contributors() {
    await shell.openExternal('https://github.com/yjj8353/Multistreaming-Assist/blob/master/%EA%B8%B0%EC%97%AC%EC%9E%90%EB%AA%A9%EB%A1%9D.md')
  }

  nginxIsWorking() {
    this.nginxIsNotWorking = this.findNginxProcess()

    if(this.findNginxProcess()) {
      this.notify('positive', 'NGINX가 정상적으로 실행중 입니다!')
    }
  }

  checkPath() {
    return !this.checkIncludeKoreanOnPath(this.dir)
  }
}
</script>
