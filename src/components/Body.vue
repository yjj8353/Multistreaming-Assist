<template>
  <!-- 앱 설치 경로에 한글이 포함되어 있을 경우 띄우는 경고창 -->
  <div v-if="isOpenPathErrorAlert">
    <path-error-alert />
  </div>

  <div v-else>
    <router-view />

    <!-- nginx 프로세스 확인 기능 사용 시, nginx 프로세스가 없는 경우 띄우는 경고창 -->
    <nginx-status-alert />

    <!-- 앱 종료시, nginx 프로세스가 실행중일 때 띄우는 경고창 -->
    <nginx-still-running-alert />

    <!-- 업데이트가 있을 때 띄우는 알림 창 -->
    <update-alert />
  </div>
</template>

<script>
import NginxStatusAlert from "src/components/NginxStatusAlert.vue";
import NginxStillRunningAlert from "src/components/NginxStillRunningAlert.vue";
import PathErrorAlert from "src/components/PathErrorAlert.vue";
import UpdateAlert from "src/components/UpdateAlert.vue";

import { CheckMixin } from "src/mixins/check";
import { StoreMixin } from "src/mixins/store";

export default {
  name: "BodyComponent",

  mixins: [CheckMixin, StoreMixin],

  components: {
    NginxStatusAlert,
    NginxStillRunningAlert,
    PathErrorAlert,
    UpdateAlert,
  },

  data() {
    return {};
  },

  mounted() {
    this.checkPath();
  },

  methods: {
    checkPath() {
      if (this.isIncludeKoreanOnPath(this.rootPath)) {
        this.openPathErrorAlert();
      } else {
        this.closePathErrorAlert();
      }
    },
  },
};
</script>
