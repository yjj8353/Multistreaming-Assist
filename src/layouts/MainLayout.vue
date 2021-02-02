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
      <!-- <div v-if="updateExist && !updatePopup">
        <UpdateComponent />
      </div> -->

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
import { namespace } from 'vuex-class'

// components
import UpdateComponent from 'src/components/UpdateComponent.vue'
import ErrorNginxPath from 'src/components/ErrorNginxPath.vue'

// mixins
import { CheckMixin } from 'src/mixins/CheckMixin'
import { NginxMixin } from 'src/mixins/NiginxMixin'
import { StoreMixin } from 'src/mixins/StoreMixin'

@Component({
  components: { UpdateComponent, ErrorNginxPath }
})
export default class MainLayout extends mixins(CheckMixin, NginxMixin, StoreMixin) {
  get win(): Electron.BrowserWindow | null { return this.$q.electron.remote.BrowserWindow.getFocusedWindow() }

  isMaximized = false
  updateExist = false

  mount() {
    this.dirsSetting()
    this.eventsSetting()
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

    const updateCheck = () => {
      //
    }

    window.addEventListener('resize', windowResizeEvent)
    window.addEventListener('load', updateCheck)
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
    await shell.openExternal('https://github.com/yjj8353/Multistreaming-Assist/blob/quasar/README.md')
  }

  async contributors() {
    await shell.openExternal('https://github.com/yjj8353/Multistreaming-Assist/blob/quasar/%EA%B8%B0%EC%97%AC%EC%9E%90%EB%AA%A9%EB%A1%9D.md')
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
