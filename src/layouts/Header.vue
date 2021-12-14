<template>
  <q-header elevated>
    <!-- 상단 바 -->
    <q-bar class="q-electron-drag">
      <q-icon :name="isNginxRunning ? 'wifi' : 'wifi_off'" />
      <div>Multistreaming-Assist</div>

      <q-space />

      <!-- 최소화, 최대화, 닫기 버튼 -->
      <q-btn dense flat icon="minimize" @click="minimizeApp" />
      <q-btn dense flat :icon="isMaximized ? 'filter_none' : 'crop_square'" @click="maximizeApp" />
      <q-btn dense flat icon="close" @click="closeApp" />
    </q-bar>

    <!-- Tool Bar -->
    <div class="q-pa-xs q-pl-md row items-center bg-blue-8">

      <!-- 도구 -->
      <div class="cursor-pointer non-selectable">
        도구
        <q-menu>
          <q-list v-if="isNginxRunning" dense style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section @click="nginxProcessCheck">NGINX 프로세스 확인</q-item-section>
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
</template>

<script>
export default {
  name: 'Header',

  data() {
    return {
      isMaximized: false,
      updateExist: false,
      nginxStatus: false,
    }
  },

  mounted() {

    // window resize 이벤트 등록
    window.addEventListener('resize', this.handleResize)
  },

  methods: {
    how2Use() {
      this.openWebPage('https://github.com/yjj8353/Multistreaming-Assist/wiki')
    },

    contributors() {
      this.$router.push('contributors')
    },

    nginxProcessCheck() {
      if(this.isNginxWorking()) {
        this.notify('positive', 'NGINX가 정상적으로 실행되고 있습니다')
      } else {
        this.openNginxStatusAlert = true
      }
    },

    handleResize() {
      this.isMaximized = this.isWindowMaximized()
    }
  }
}
</script>
