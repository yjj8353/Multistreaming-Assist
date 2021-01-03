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

      <!-- 업데이트가 존재하고, 팝업금지가 체크되어 있지 않을 때 표시함 -->
      <!-- <div v-if="updateExist && !updatePopup">
        <UpdateComponent />
      </div> -->

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

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapActions, mapGetters } from 'vuex'
import { Action, Getter, namespace } from 'vuex-class'

import UpdateComponent from 'src/components/UpdateComponent.vue'

const dirStore = namespace('dir')
const nginxStore = namespace('nginx')
const optionStore = namespace('option')

@Component({
  mixins: [],
  components: { /* UpdateComponent */ }
})
export default class MainLayout extends Vue {
  @dirStore.Action('dir') setDir!: (arg0: { value: string }) => void
  @dirStore.Action('rootDir') setRootDir!: (arg0: { value: string }) => void
  @dirStore.Action('nginxDir') setNginxDir!: (arg0: { value: string }) => void
  @dirStore.Action('nginxConfDir') setNginxConfDir!: (arg0: { value: string }) => void
  @dirStore.Action('nginxLogsDir') setNginxLogsDir!: (arg0: { value: string }) => void
  @dirStore.Getter('dir') getDir!: string
  @dirStore.Getter('rootDir') getRootDir!: string
  @dirStore.Getter('nginxDir') getNginxDir!: string
  @dirStore.Getter('nginxConfDir') getNginxConfDir!: string
  @dirStore.Getter('nginxLogsDir') getNginxLogsDir!: string

  @optionStore.Action('updatePopup') setUpdatePopup!: (arg0: { value: boolean }) => void
  @optionStore.Getter('updatePopup') getUpdatePopup!: boolean

  @nginxStore.Action('nginxStatus') setNginxStatus!: (arg0: { value: boolean }) => void
  @nginxStore.Getter('nginxStatus') getNginxStatus!: boolean

  get dir(): string { return this.getDir }
  set dir(value: string) { this.setDir({ value: value }) }

  get rootDir(): string { return this.getRootDir }
  set rootDir(value: string) { this.setRootDir({ value: value }) }

  get nginxDir(): string { return this.getNginxDir }
  set nginxDir(value: string) { this.setNginxDir({ value: value }) }

  get nginxConfDir(): string { return this.getNginxConfDir }
  set nginxConfDir(value: string) { this.setNginxConfDir({ value: value }) }

  get nginxLogsDir(): string { return this.getNginxLogsDir }
  set nginxLogsDir(value: string) { this.setNginxLogsDir({ value: value }) }

  isMaximize = false
}
</script>
