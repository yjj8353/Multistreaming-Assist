<template>
  <q-layout class="shadow-2 rounded-borders">
    <HeaderComponent />
    <q-page-container>
      <BodyComponent />
    </q-page-container>
  </q-layout>
</template>

<script>
import HeaderComponent from "../components/Header.vue";
import BodyComponent from "../components/Body.vue";

import { StoreMixin } from "src/mixins/store";
import { ConfigMixin } from "src/mixins/config";
import { UpdateMixin } from "src/mixins/update";

export default {
  name: "App",

  mixins: [StoreMixin, ConfigMixin, UpdateMixin],

  components: {
    HeaderComponent,
    BodyComponent,
  },

  mounted() {
    this.setDirname().then(() => {
      this.setRootAndNginxPaths();
      // this.settingPath();
      // this.settingBroadcastOption();
      // this.checkUpdate();
    });
  },

  methods: {
    settingBroadcastOption() {
      const result = this.readBroadcastOption();

      if (result) {
        this.twitchKey = result.keys.twitch;
        this.youtubeKey = result.keys.youtube;
        this.additionalRTMPUrl = result.keys.rtmpUrl;
        this.additionalRTMPKey = result.keys.rtmpKey;

        this.twitchOn = result.options.twitchOn;
        this.youtubeOn = result.options.youtubeOn;
        this.additionalOn = result.options.additionalOn;
        this.recordingOn = result.options.recordingOn;

        this.recordingPath = result.options.recordingPath;

        this.isUpdatePopupEnable = result.options.isUpdatePopupEnable;
      }
    },

    checkUpdate() {
      const isUpdateExist = this.isUpdateExist();
      const isUpdatePopupEnable = this.isUpdatePopupEnable;

      if (isUpdateExist && isUpdatePopupEnable) {
        this.openUpdateAlert = true;
      }
    },
  },
};
</script>
