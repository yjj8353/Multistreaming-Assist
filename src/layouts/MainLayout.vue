<template>
  <q-layout class="shadow-2 rounded-borders">

    <!-- 경로에 한글이 포함되어 있지 않을 경우 -->
    <div v-if="checkIncludeKoreanOnPath()">
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

      <!-- updateExist 존재할때만 키도록 할 것 -->
      <div v-if="updateExist && !updatePopup">
        <UpdateComponent />
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

  </q-layout>
</template>

<script>
import { shell } from 'electron'
import { execFileSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import https from 'follow-redirects/https'

// Mixin
import { NginxMixin } from 'src/mixins/NginxMixin'
import { FunctionMixin } from 'src/mixins/FunctionMixin'

// vuex
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

import UpdateComponent from 'src/components/UpdateComponent.vue'

export default {
  name: 'MainLayout',

  mixins: [NginxMixin, FunctionMixin],

  components: { UpdateComponent },

  computed: {
    ...mapGetters('option', {
      getUpdatePopup: 'updatePopup'
    }),

    ...mapGetters('dir', {
      getDir: 'dir',
      getRootDir: 'rootDir',
      getNginxDir: 'nginxDir',
      getNginxConfDir: 'nginxConfDir',
      getNginxLogsDir: 'nginxLogsDir'
    }),

    ...mapGetters('nginx', {
      getNginxStatus: 'nginxStatus'
    }),

    dir: {
      get() { return this.getDir }
    },

    rootDir: {
      get() { return this.getRootDir },
      set(value) { this.setRootDir(value) }
    },

    nginxDir: {
      get() { return this.getNginxDir },
      set(value) { this.setNginxDir(value) }
    },

    nginxConfDir: {
      get() { return this.getNginxConfDir },
      set(value) { this.setNginxConfDir(value) }
    },

    nginxLogsDir: {
      get() { return this.getNginxLogsDir },
      set(value) { this.setNginxLogsDir(value) }
    },

    nginxStatus: {
      get() { return this.getNginxStatus },
      set(value) { this.setNginxStatus(value) }
    },

    win: {
      get() { return this.$q.electron.remote.BrowserWindow.getFocusedWindow() }
    },

    updatePopup: {
      get() { return this.getUpdatePopup },
      set(value) { return this.setUpdatePopup(value) }
    }
  },

  mounted() {
    // rootDir, nginxDir, nginxConfDir 값을 세팅
    this.rootDir = this.dir
    this.nginxDir = this.rootDir
    this.nginxConfDir = this.nginxDir
    this.nginxLogsDir = this.nginxDir

    window.addEventListener('resize', this.windowResizeEvent)

    window.addEventListener('load', async() => {
      await this.updateCheck()

      console.log(this.updatePopup)
      console.log(this.updateExist)
    })
  },

  data () {
    return {
      // update 여부
      updateExist: false,

      // 현재 최대화 상태를 저장하는 변수
      isMaximized: false
    }
  },

  methods: {
    ...mapActions('option', {
      setUpdatePopup: 'updatePopup'
    }),

    ...mapActions('dir', {
      setRootDir: 'rootDir',
      setNginxDir: 'nginxDir', 
      setNginxConfDir: 'nginxConfDir',
      setNginxLogsDir: 'nginxLogsDir'
    }),

    ...mapActions('nginx', {
      setNginxStatus: 'nginxStatus'
    }),

    /*
    * minimize: 프로그램 창 최소화
    * maximize: 프로그램 창 최대화
    * closeApp: 프로그램 닫기
    * windowResizeEvent: 프로그램 창 크기가 변경될시, isMaximize 변수를 갱신
    * how2Use: 사용법 페이지 열기
    * contributors: 기여자 목록 페이지 열기
    * nginxIsWorking: 프로그램을 닫을시, 현재 nginx가 실행중인지 확인
    * checkIncludeKoreanOnPath: 프로그램이 켜질시, 현재 프로그램 경로에 한글이 포함되었는지 확인
    */
    minimize() {
      if (process.env.MODE === 'electron') {
        this.win.minimize()
      }
    },

    maximize() {
      if (process.env.MODE === 'electron') {
        if (this.win.isMaximized()) {
          this.win.unmaximize()
          this.isMaximized = false
        } else {
          this.win.maximize()
          this.isMaximized = true
        }
      }
    },

    closeApp() {
      if (this.nginxStatus) {
        this.$q.dialog({
          title: '잠깐만요!',
          message: '아직 nginx가 켜져있는거 같습니다만... 정말로 종료할까요?',
          ok: {
            push: true,
            label: '물론이죠!'
          },
          cancel: {
            push: true,
            color: 'negative',
            label: '잠깐만요!'
          },
          tersistent: true
        }).onOk(() => {
          try {
            execFileSync('./nginx.exe', ['-s', 'stop'], { cwd: this.nginxDir })
          } catch (e) {

          }
          this.win.close()
        }, this).onCancel(() => {
          // 아무것도 하지 않음
        }).onDismiss(() => {
          // 아무것도 하지 않음
        })
      } else {
        this.win.close()
      }
    },
    
    windowResizeEvent () {
      if (this.win.isMaximized()) {
        this.isMaximized = true
      } else {
        this.isMaximized = false
      }
    },

    async updateCheck() {
      let finalUrl
      let thisProgramVersion
      let latestProgramVersion

      const request = https.request({
        host: 'github.com',
        path: '/yjj8353/Multistreaming-Assist/releases/latest'
      }, async response => {
        const re = /[0-9]+\.[0-9]+\.[0-9]+/

        finalUrl = await response.responseUrl.toString()
        latestProgramVersion = re.exec(finalUrl.replace('https://github.com/yjj8353/Multistreaming-Assist/releases/tag/', ''))[0]
        thisProgramVersion = fs.readFileSync(path.join(this.getRootDir, 'version'), 'UTF-8')

        const lpvArray = latestProgramVersion.split('.')
        const tpvArray = thisProgramVersion.split('.')

        if(parseInt(lpvArray[0]) > parseInt(tpvArray[0])) {
          // major version update 있음
          this.updateExist = true
          console.log('true')
        } else {
          if(parseInt(lpvArray[1]) > parseInt(tpvArray[1])) {
            // minor version update 있음
            this.updateExist = true
            console.log('true')
          } else {
            if(parseInt(lpvArray[2]) > parseInt(tpvArray[2])) {
              // patch version update 있음
              this.updateExist = true
              console.log('true')
            } else {
              // version 동일함
              this.updateExist = false
              console.log('false')
            }
          }
        }
      }).on('error', err => {
        console.log(err)
      })

      request.end()
    },

    how2Use () {
      shell.openExternal('https://github.com/yjj8353/Multistreaming-Assist/blob/quasar/README.md')
    },

    contributors () {
      shell.openExternal('https://github.com/yjj8353/Multistreaming-Assist/blob/quasar/%EA%B8%B0%EC%97%AC%EC%9E%90%EB%AA%A9%EB%A1%9D.md')
    },

    nginxIsWorking () {
      const result = this.findNginxProcess()

      if (result) {
        this.notify('positive', 'Nginx는 정상적으로 실행 중 입니다')
      } else {
        this.$q.dialog({
          title: '저런...',
          message: '어째서인지 Nginx가 꺼져있는거 같은데, 재기동 할까요?',
          ok: {
            push: true,
            label: '물론이죠!'
          },
          cancel: {
            push: true,
            color: 'negative',
            label: '처음 상태로 되돌려주세요!'
          },
          tersistent: true
        }).onOk(() => {
          const err = this.startNginxProcess()

          if (err) {
            this.nginxStatus = false
            this.notify('negative', 'nginx 실행에 실패했습니다')
          }
        }, this).onCancel(() => {
          this.nginxStatus = false
        }, this)
      }
    },

    checkIncludeKoreanOnPath() {
      const re = new RegExp('[ㄱ-ㅎ|ㅏ-ㅑ|가-힣]')
      return !(re.test(this.dir))
    }
  }
}
</script>
