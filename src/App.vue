<template>
  <div id="q-app">
    <q-layout class="shadow-2 rounded-borders">
      <q-header elevated>

        <q-bar class="q-electron-drag">
          <q-icon :name="$store.state.nginxStatus ? 'wifi' : 'wifi_off'" />
          <div>Multistreaming-Assist</div>

          <q-space />

          <q-btn dense flat icon="minimize" @click="minimize" />
          <q-btn dense flat :icon="isMaximized ? 'filter_none' : 'crop_square'" @click="maximize" />
          <q-btn dense flat icon="close" @click="closeApp" />
        </q-bar>

        <div class="q-pa-xs q-pl-md row items-center">
          <div class="cursor-pointer non-selectable">
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
          <div class="q-ml-md cursor-pointer non-selectable">
            도구
            <q-menu>
              <q-list v-if="$store.state.nginxStatus" dense style="min-width: 100px">
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
        </div>
      </q-header>
      
      <child></child>

    </q-layout>
  </div>
</template>
<script>
import { shell } from 'electron'
import { execFileSync } from 'child_process'
import { startNginxProcess } from './function/nginx'
import { findNginxProcess }  from './function/nginx'
import path from 'path'
import Index from './pages/Index'

export default {
  name: 'App',
  components: {
    child: Index
  },
  created () {
    window.addEventListener("resize", this.windowResizeEvent)
  },
  destroyed () {

  },
  data () {
    return {
      isMaximized: false
    }
  },
  methods: {
    windowResizeEvent () {
      const win = this.$q.electron.remote.BrowserWindow.getFocusedWindow()

      if (win.isMaximized()) {
        this.isMaximized = true
      } else {
        this.isMaximized = false
      }
    },

    minimize () {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize()
      }
    },

    maximize () {
      if (process.env.MODE === 'electron') {
        const win = this.$q.electron.remote.BrowserWindow.getFocusedWindow()

        if (win.isMaximized()) {
          win.unmaximize()
          this.isMaximized = false
        } else {
          win.maximize()
          this.isMaximized = true
        }
      }
    },

    closeApp () {
      if (this.$store.state.nginxStatus) {
        this.$q.dialog({
          title: '잠깐만요!',
          message: '아직 nginx가 켜져있는거 같습니다만... 정말로 종료할까요?',
          ok: {
            push: true
          },
          cancel: {
            push: true,
            color: 'negative'
          },
          tersistent: true
        }).onOk(() => {
          execFileSync('./nginx.exe', ['-s', 'stop'], { cwd: path.join(this.$store.state.dir, '\\nginx') })
          this.$q.electron.remote.BrowserWindow.getFocusedWindow().close()
        }).onCancel(() => {

        }).onDismiss(() => {

        })
      } else {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().close()
      }
    },

    how2Use () {
      shell.openExternal('https://github.com/yjj8353/Multistreaming-Assist/blob/quasar/README.md')
    },

    contributors () {
      shell.openExternal('https://github.com/yjj8353/Multistreaming-Assist/blob/quasar/%EA%B8%B0%EC%97%AC%EC%9E%90%EB%AA%A9%EB%A1%9D.md')
    },

    nginxIsWorking () {
      const result = findNginxProcess()

      if (result) {
        this.$q.notify({type: 'positive', message: 'Nginx는 정상적으로 실행 중 입니다'})
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
          const err = startNginxProcess(path.join(this.$store.state.dir, '\\nginx'))

          if (err) {
            console.log(Index.methods)
            this.$store.commit('setNginxStatus', false)
            this.$q.notify({type: 'negative', message: 'nginx 실행에 실패했습니다'})
          }
        }).onCancel(() => {
          this.$store.commit('setNginxStatus', false)
        })
      }
    }
  }
}
</script>
