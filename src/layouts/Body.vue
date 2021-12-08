<template>
  <!-- 앱 설치 경로에 한글이 포함되어 있을 경우 띄우는 경고창 -->
  <div v-if="openPathErrorAlert">
    <path-error-alert />
  </div>

  <div v-else>
    <router-view />

    <!-- nginx 프로세스 확인 기능 사용 시, nginx 프로세스가 없는 경우 띄우는 경고창 -->
    <nginx-status-alert />

    <!-- 앱 종료시, nginx 프로세스가 실행중일 때 띄우는 경고창 -->
    <nginx-still-running-alert />

    <!-- 업데이트가 있을 때 띄우는 알림 창 -->
    <div v-if="openUpdateAlert">
      <update-alert />
    </div>
  </div>
</template>

<script>
import NginxStatusAlert from 'src/components/NginxStatusAlert.vue'
import NginxStillRunningAlert from 'src/components/NginxStillRunningAlert.vue'
import PathErrorAlert from 'src/components/PathErrorAlert.vue'
import UpdateAlert from 'src/components/UpdateAlert.vue'
import { CheckMixin } from 'src/mixins/check'
import { ConfigMixin } from 'src/mixins/config'
import { MapperMixin } from 'src/mixins/mapper'
import { NginxMixin } from 'src/mixins/nginx'
import { QuasarMixin } from 'src/mixins/quasar'

export default {
  name: 'Body',

  mixins: [
    CheckMixin,
    ConfigMixin,
    MapperMixin,
    NginxMixin,
    QuasarMixin
  ],

  components: {
    NginxStatusAlert,
    NginxStillRunningAlert,
    PathErrorAlert,
    UpdateAlert
  },

  data() {
    return {
    }
  },

  mounted() {
    this.checkPath()
    this.checkUpdate()
  },

  methods: {
    checkPath() {
      this.openPathErrorAlert = this.isIncludeKoreanOnPath(this.rootPath)
    },

    checkUpdate() {
      this.isUpdateExist = false
      this.isUpdatePopupEnable = false

      if(this.isUpdateExist && this.isUpdatePopupEnable) {
        this.openUpdateAlert = true
      }
    }
  }
}
</script>
