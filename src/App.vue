<template>
  <div id="q-app">
    <q-layout class="shadow-2 rounded-borders">

      <q-header elevated>

        <q-bar class="q-electron-drag">
          <q-icon :name="$store.state.nginxStatus ? 'wifi' : 'wifi_off'" />
          <div>Multistreaming-Assist</div>

          <q-space />

          <q-btn dense flat icon="minimize" @click="minimize" />
          <q-btn dense flat icon="crop_square" @click="maximize" />
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
        </div>
      </q-header>
      
      <child></child>
    
    </q-layout>
  </div>
</template>
<script>
import { shell } from 'electron'
import { execFileSync } from 'child_process'
import path from 'path'
import Index from './pages/Index'

export default {
  name: 'App',
  components: {
    child: Index
  },
  data () {
    return {
      
    }
  },
  methods: {
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
        } else {
          win.maximize()
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
      shell.openExternal('https://github.com/yjj8353/Multistreaming-Assist/blob/master/README.md')
    },

    contributors () {
      shell.openExternal('https://github.com/yjj8353/Multistreaming-Assist/blob/master/%EA%B8%B0%EC%97%AC%EC%9E%90%EB%AA%A9%EB%A1%9D.md')
    }
  }
}
</script>
